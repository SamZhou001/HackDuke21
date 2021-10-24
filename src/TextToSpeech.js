import React from "react";
import Button from '@mui/material/Button';

class TextToSpeech extends React.Component {

    readAloud = () => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = this.props.text;
        window.speechSynthesis.speak(speech)
    }

    render() {
        return(
            <Button variant="contained" onClick={this.readAloud}>Read aloud</Button>
        )
    }
}

export default TextToSpeech;