async function asynchronous() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let data = await response.json();
        data.forEach(element => {
            console.log(element.title);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

asynchronous();