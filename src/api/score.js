export const getScore = (id, audioPath) => {
    const response = fetch(`https://thefluentme.p.rapidapi.com/score/${id}`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-host": "thefluentme.p.rapidapi.com",
            "x-rapidapi-key": "b8086fddd9mshb3ea1bc9b2b0730p1d8449jsnebc8d7aa02ab"
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