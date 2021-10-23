export const retrieveAllPosts = async () => {
    const response = fetch("https://thefluentme.p.rapidapi.com/post?page=1&per_page=10", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "thefluentme.p.rapidapi.com",
            "x-rapidapi-key": "b8086fddd9mshb3ea1bc9b2b0730p1d8449jsnebc8d7aa02ab"
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