const { MongoClient, ObjectId, ObjectID } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("twitter");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const secret = "Okns";


//verify token
function auth(req,res,next){
  const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ msg: "token missing" });

	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(403).json({ msg: "invalid token" });
		}

		res.locals.user = user;
		next();
	});
}

//get all user
app.get("/users", async (req, res) => {
  const results = await db.collection("users").find().toArray();
  res.json(results);
});

//register
app.post("/users/register", async (req, res) => {
  const { name, handle, profile, password } = req.body;
  if (!name || !handle || !password) {
    return res.status(403).json({ msg: "Name Handle Password Required!!!!" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await db.collection("users").insertOne({
    name,
    handle,
    profile,
    password: hash,
  });

  if (user.insertedId) {
    const result = await db.collection("users").findOne({
      _id: ObjectId(user.insertedId),
    });

    if (result) {
      return res.json(result);
    } else {
      return res.status(404).json({ msg: "Something Wrong!!!" });
    }
  } else {
    return res.status(500).json({ msg: "Register Fail" });
  }
});

//login
app.post('/users/login',async(req,res)=>{
  const {handle,password} = req.body;

  if( !handle || !password){
    return res.status(400).json({msg:"Name , handle , password Required!!!"})
  }

  const user = await db.collection('users').findOne({
    handle
  });
  if(user){
    const valid = await bcrypt.compare(password,user.password);

    if(valid){
      const token = jwt.sign(user,secret);
      return res.send(token)
    }
    res.status(401).json({msg:" Password is wrong!!!"})
  }
  res.status(401).json({msg:'Handle not found'});
})

app.get('/users/verify',auth,async(req,res)=>{
   res.json(res.locals.user);
})

app.put('/users/:id',auth,async(req,res)=>{
  const {id} = req.params;
  const {name,profile,password} = req.body;
  if(!name){
    return res.status(400).json({msg:"Atleast Name Need"})
  }
  
  const data = {name,profile};
  if(password){
    data.password = await bcrypt.hash(password,10);
  }
  const result = await db.collection('users').updateOne(
    {
      _id : ObjectId(id)
    },
    {
      $set : data
    }
  )
  if(result.acknowledged){
    const user = await db.collection('users').findOne({_id:ObjectId(id)})
    return res.json(user);
  }
  res.sendStatus(500);
})

app.get("/tweets", async (req, res) => {
	try {
		const tweets = await db
			.collection("tweets")
			.aggregate([
				{
					$match: {
						type: "post",
					},
				},
				{
					$sort: {
						created: -1,
					},
				},
				{ $limit: 20 },
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "likes_users",
					},
				},
				{
					$lookup: {
						from: "tweets",
						localField: "_id",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "owner_user",
								},
							},
							{
								$lookup: {
									from: "tweets",
									localField: "_id",
									foreignField: "origin",
									as: "comments",
								},
							},
						],
					},
				},
			])
			.toArray();

		res.json(tweets);
	} catch (e) {
		res.sendStatus(500);
	}
});

app.post('/tweet',auth,async(req,res)=>{
	const user = res.locals.user;
	const {body} = req.body;

	if(!body){
		return res.status(403).json({msg:'Body require to upload!!!'})
	}
	const result = await db.collection('tweets').insertOne({
		type:'post',
		body,
		owner: ObjectId(user._id),
		created : new Date(),
		likes : []
	});

	if(result.insertedId){
		const tweet = await db.collection('tweets').aggregate([
			{
				$match : {_id : ObjectId(result.insertedId)}
			},
			{
				$lookup : {
					from : 'users',
					foreignField : '_id',
					localField : 'owner',
					as : 'owner_user'
				}
			}
		]).toArray();

		let data = tweet[0];
		data.comments = [];

		return res.json(data);
	}
	else {
		return res.sendStatus(500).json(result);
	}
})

app.get('/users/:handle',async(req,res)=>{
	const {handle} = req.params;
	const user = await db.collection('users').aggregate([
		{
			$match : {handle}
		},
		{
			$lookup : {
				from : 'users',
				foreignField : '_id',
				localField : 'followers',
				as : 'followers_users'
			}
		},
		{
			$lookup: {
				from: "users",
				localField: "following",
				foreignField: "_id",
				as: "following_users",
			},
		},
	]).toArray();

	if(user){
		return res.json(user[0])
	}
	else {
		return res.status(500).json(user);
	}
})

app.get('/tweets/:id',async(req,res)=>{
	const {id} = req.params;
	try{
		const result = await db.collection('tweets').aggregate([
			{
				$match : {_id : ObjectId(id)}
			},
			{
				$lookup : {
					from : 'users',
					foreignField : '_id',
					localField : 'owner',
					as : 'owner_user'
				}
			},
			{
				$lookup : {
					from : 'tweets',
					foreignField : 'origin',
					localField : '_id',
					as : 'comments',
					pipeline : [
						{
							$lookup : {
								from : 'users',
								foreignField : '_id',
								localField : 'owner',
								as : 'owner_user'
							}
						},
						{
							$lookup : {
								from : 'tweets',
								foreignField : 'origin',
								localField : '_id',
								as : 'comments'
							}
						}
					]
				}
			}
		]).toArray();
	
		res.json(result[0]);
	}
	catch (e) {
		return res.sendStatus(500);
	}
})

app.post('/comment',auth,async(req,res)=>{
	const user = res.locals.user;
	const {body,origin} = req.body;

	const result = await db.collection('tweets').insertOne({
		type:'comment',
		body,
		origin : ObjectId(origin),
		owner : ObjectId(user._id),
		created : new Date(),
		likes : []
	})
	if(result.insertedId){
		const tweet = await db.collection('tweets').aggregate([
			{
				$match : {_id : ObjectId(result.insertedId)}
			},
			{
				$lookup : {
					from :'users',
					foreignField : '_id',
					localField : 'owner',
					as : 'owner_user'
				}
			}
		]).toArray();
		const data = tweet[0];
		data.comments = [];

		return res.json(data);
	}
	else {
		return res.status(500).json(result);
	}
})

app.listen(8000, () => {
  console.log("Api running at 8000");
});
