// fetch("https://jsonplaceholder.typicode.com/posts/")
//     .then((response) => response.json())
//     .then((data) => console.log(data));

async function get(host, path) {
    const url = `https://${host}/${path}`;
    const options = {
        method : "GET",
    };

    const res = await fetch(url, options);
    const data = await res.json();
    
    if (res.ok) {
        return data;
    }
    else throw Error(data);
    
}

get("jsonplaceholder.typicode.com", "posts")
.then((data) => {
    for (let i = 0; i < 100; i++)
    console.log(data[i].title);
})
.catch((error) => console.log(error));