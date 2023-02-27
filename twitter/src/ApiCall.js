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