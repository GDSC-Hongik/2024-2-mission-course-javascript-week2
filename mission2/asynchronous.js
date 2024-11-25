async function fetchAndPrintTitles() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        data.forEach(post => {
            console.log(post.title);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndPrintTitles();
