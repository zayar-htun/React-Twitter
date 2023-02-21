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