export const retrieveAllPosts = async () => {
    const { REACT_APP_API_KEY } = process.env;
    const response = fetch("https://thefluentme.p.rapidapi.com/post?page=1&per_page=10", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "thefluentme.p.rapidapi.com",
            "x-rapidapi-key": REACT_APP_API_KEY
        }
    })
    .then(async (response) => {
        const res = await response.json();
        const allData = [];
        for (let data of res[1].posts) {
            allData.push({
                difficulty: data.post_title.split('_')[0],
                id: data.post_id,
                content: data.post_content,
            })
        }
        return allData
    });
    return response;
}