export const getScore = (id, audioPath) => {
    const { REACT_APP_API_KEY } = process.env;
    const response = fetch(`https://thefluentme.p.rapidapi.com/score/${id}`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-host": "thefluentme.p.rapidapi.com",
            "x-rapidapi-key": REACT_APP_API_KEY
        },
        "body": {
            "audio_provided": audioPath
        }
    })
    .then(async (response) => {
        const res = await response.json();
        const overallResults = res[0].overall_result_data[0];
        const wordResults = res[0].word_result_data;
        return {
            points: overallResults.overall_points,
            recognizedWords: overallResults.number_of_recognized_words,
            totalWords: overallResults.number_of_words_in_post,
            wordResults,
        }
    });
    return response;
}