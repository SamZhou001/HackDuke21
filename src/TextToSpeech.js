import React from "react";
import Button from '@mui/material/Button';

class TextToSpeech extends React.Component {

    readAloud = () => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = this.props.text;
        window.speechSynthesis.speak(speech)
    }

    stopReadingAloud = () => {
        window.speechSynthesis.cancel();
    }

    render() {
        return(
            <>
                <Button variant="contained" onClick={this.readAloud} sx={{mr: 2}}>Read aloud</Button>
                <Button variant="contained" onClick={this.stopReadingAloud}>Stop Reading Aloud</Button>
            </>
        );
    }
}

export default TextToSpeech;