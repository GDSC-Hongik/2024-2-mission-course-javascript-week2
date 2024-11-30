fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((res) => res.json())
    .then((data) => {
        let posts = data;

        posts.map((post) =>{
            console.log(post.title);
        })
    })