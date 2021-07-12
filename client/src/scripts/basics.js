const post = (method, item, url=false) => {
    fetch(url || `${window.location.protocol}//${window.location.hostname}:5000/api/items/`, {
        method: method,
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })  
}

export {
    post,
}