function getToken(){
    return localStorage.getItem("token");
}

const api = 'http://localhost:8000';
export async function register(name,handle,profile,password){
    const res = await fetch('http://localhost:8000/users/register',{
        method : 'POST',
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({name,handle,profile,password})
    })

    if(!res.ok){
        return false;
    }
    const user = await res.json();
    return user;
}

export async function login(handle,password){
    const res = await fetch('http://localhost:8000/users/login',{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body: JSON.stringify({handle,password})
    })

    if(!res.ok){
        return false;
    }
    const token = await res.text();
    localStorage.setItem("token", token);
    return token;
}



export async function verify(){
    const token = getToken();
    if(!token) return false;

    const res = await fetch(`${api}/users/verify`,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });

    if(!res.ok) return false ;

    const user = await res.json();
    return user;
}

export async function editProfile(id,name,profile,password){
    const token = getToken();
    if(!token){
        return false;
    }
    const res = await fetch(`${api}/users/${id}`,{
        method : "PUT",
        headers : {"Authorization" : `Bearer ${token}`,'Content-Type':'application/json'},
        body : JSON.stringify({name,profile,password})
    })

    if(!res.ok){
        return false;
    }
    const user = await res.json();
    return user;
}

export async function getTweets(){
    const res = await fetch('http://localhost:8000/tweets');
    if(!res.ok){
        return false
    }
    const tweets = await res.json();
    return tweets;
}


export async function postTweet(body){
    const token = getToken();
    if(!token){
        return false;
    }
    const res = await fetch('http://localhost:8000/tweet',{
        method :'POST',
        headers : {
            'authorization':`Bearer ${token}`,'Content-Type':'application/json'
        },
        body : JSON.stringify({body})
    })

    if(!res.ok){
        return false
    }
    const result = await res.json();
    return result
}

export async function getUser(handle){
    const res = await fetch(`${api}/users/${handle}`);
    if(!res.ok){
        return false
    }
    const result = await res.json();
    return result;
}

export async function getTweet(id){
    const res = await fetch(`http://localhost:8000/tweets/${id}`);
    if(!res.ok){
        return false
    }
    const result = await res.json();
    return result;
}

export async function postComment(body,origin){
    const token = getToken();
    if(!token){
        return false
    }
    const res = await fetch('http://localhost:8000/comment',{
        method : "POST",
        headers : {'authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        body : JSON.stringify({body,origin})
    })
    if(!res.ok){
        return false
    }
    const tweet  = await res.json();
    return tweet
}