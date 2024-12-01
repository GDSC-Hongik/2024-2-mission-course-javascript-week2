async function asynchronous(){ 
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/')
    let jsonarray = await response.json()
    jsonarray.forEach(element => {
        console.log(element.title)
    });
    }

asynchronous()