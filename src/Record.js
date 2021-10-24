// Adapted from https://github.com/Matheswaaran/react-mp3-audio-recording

import './Record.css';
import react from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import ReactPolling from "react-polling";
import {Button, Grid, Box} from '@mui/material';

import firebaseApp from './firebase.js';
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as refDatabase, child, get, set } from "firebase/database";

class Record extends react.Component {

  constructor(props){
    super(props);
    this.state = {
      recordState: RecordState.NONE,
      blobURL: "",
      transcriptId: null,
      text: null,
      processing: false,
      result: [],
    };
  }

  preprocess(text) {
    const textList = text.split(' ');
    const processedText = textList.map((word) => {
      const lowerCaseWord = word.toLowerCase();
      return lowerCaseWord.replace(/[^a-zA-Z0-9]+/g, "")
    })
    return processedText;
  }

  evaluate(answer, text) {
    const newArr = new Array(answer.length+1).fill(0).map(() => new Array(text.length+1).fill([]));
    for (let i = 0; i <= answer.length; i++) {
      for (let j = 0; j <= text.length; j++) {
        if (i === 0 || j === 0) {
          newArr[i][j] = [0, 0, 0];
        } else {
          if (answer[i-1] === text[j-1]) {
            newArr[i][j] = [newArr[i-1][j-1][0] + 1, i-1, j-1];
          } else {
            if (newArr[i-1][j][0] > newArr[i][j-1][0]) {
              newArr[i][j] = [newArr[i-1][j][0], i-1, j];
            } else {
              newArr[i][j] = [newArr[i][j-1][0], i, j-1];
            }
          }
        }
      }
    }
    console.log(newArr);
    let commonString = [];
    let i = answer.length;
    let j = text.length;
    while (i !== 0 || j !== 0) {
      if (newArr[i][j][1] === i-1 && newArr[i][j][2] === j-1) {
        commonString = [answer[i-1]].concat(commonString);
      }
      const tmp = i;
      i = newArr[i][j][1];
      j = newArr[tmp][j][2];
    }
    let answerPointer = 0;
    let commonStringPointer = 0;
    const result = [];
    while (answerPointer < answer.length && commonStringPointer < commonString.length) {
      if (answer[answerPointer] === commonString[commonStringPointer]) {
        result.push(true);
        answerPointer ++;
        commonStringPointer ++;
      } else {
        result.push(false);
        answerPointer ++;
      }
    };
    while (answerPointer < answer.length) {
      result.push(false);
      answerPointer ++;
    }
    return result;
  }

  // Start recording
  start = () => {
    this.setState({
      recordState: RecordState.START,
      blobURL: "",
      transcriptId: null,
      text: null
    })
  }
  
  // Stop recording
  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }
 
  // audioData contains blob and blobUrl
  onStop = (audioData) => {
    console.log('audioData', audioData)

    this.setState({blobURL: audioData.url, processing: true})

    // Firebase database reference
    const dbRef = refDatabase(getDatabase(firebaseApp));
    
    // Get the recording number from the Firebase database, which will be the filename of this recording
    get(child(dbRef, "recordingNum")).then((snapshot) => {
        if (snapshot.exists()) {
            // recordingNum retreived successfully
            console.log("recordingNum retrieved successfully: " + snapshot.val());
            
            // Upload this recording to Firebase storage with filename recordingNum + ".wav"
            let recordingNum = snapshot.val();
            const storageRef = refStorage(getStorage(firebaseApp), recordingNum + ".mp3");
            uploadBytes(storageRef, audioData.blob).then((snapshot) => {
                // Recording uploaded successfully
                console.log("Uploaded recording " + recordingNum + " successfully");
                
                // Get the url of the uploaded recording to pass to thefluent API
                getDownloadURL(storageRef).then((url) => {
                    // Url retrieved successfully
                    console.log("Recording url: " + url);

                    // Upload audio to AssemblyAI

                    // Create axios object with AssemblyAI url and headers
                    const axios = require("axios");
                    const assembly = axios.create({
                      baseURL: "https://api.assemblyai.com/v2",
                      headers: {
                        authorization: "a1857fd94b0b4671b02ed775f0d3e59b",
                        "content-type": "application/json",
                      },
                    });
                    
                    // Post to Assembly AI with url to audio file
                    assembly.post(`/transcript`, {
                      audio_url: url
                    })
                    .then((res) => {
                      // Audio file uploaded successfully to Assembly AI
                      console.log(res.data);
                      
                      // Update the state with the id of the transcript
                      // This will add the ReadPolling component to the DOM, starting the polling necessary to get the text
                      this.setState({ transcriptId: res.data.id });

                    }).catch((err) => console.error(err));

                }).catch((error) => {
                    // Url retrieval failed
                    console.log("Couldn't get url of recording");
                })
                
                // Increment recordingNum in Firebase database
                set(dbRef, {
                    recordingNum: recordingNum + 1
                }).then(() => {
                    // recordingNum update successful
                    console.log("recordingNum updated successfully to " + (recordingNum + 1));
                }).catch((error) => {
                    // recordingNum update failed
                    console.log("recordingNum could not be updated");
                });
            });

        } else{
            // recordingNum retrieval did not return any value
            console.log("recordingNum retrieved but not available");
        }
    }).catch((error) => {
        // recordingNum retreival failed
        console.log("recordingNum not retrieved")
    });
  }


  render() {

    // Base recording object
    let object = (
      <>
        <Grid container mt={2} direction="column" alignItems='center'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AudioReactRecorder state={this.state.recordState} onStop={this.onStop} type="audio/mp3" backgroundColor="rgb(255, 255, 255)" foregroundColor="rgb(25, 117, 210)" canvasWidth="800" canvasHeight="180" />
            </Grid>
            <Grid item xs={12}>
              <Button key="recording-button-record" onClick={this.start} disabled={!(this.state.recordState === RecordState.NONE || this.state.recordState === RecordState.STOP) || this.state.processing}>Record</Button>
              <Button key="recording-button-stop" onClick={this.stop} disabled={!(this.state.recordState === RecordState.START) || this.state.processing}>Stop</Button>
            </Grid>
            <Grid item xs={12}>
              <audio key="recording-playback" src={this.state.blobURL} controls="controls" />
            </Grid>
            <Grid item xs={12}>
              {this.state.result !== []? this.state.result : <div></div>}
            </Grid>
          </Grid>
        </Grid>
      </>
    );


    // Array of components to return
    // If Assembly AI is currently being polled, a ReactPolling object will be added to this array
    let components = [object];

    if(this.state.transcriptId == null && this.state.processing)
    {
      components.push(<Box sx={{m: 4}} />);
      components.push(<p>Uploading audio...</p>);
    }

    // Add a ReadPolling component if we need to get the text of an audio file recently uploaded to Assembly AI
    if(this.state.transcriptId != null)
    {
      // Add a spacing object
      components.push(<Box sx={{m: 4}} />);
      components.push(
        <ReactPolling
          url={'https://api.assemblyai.com/v2/transcript/' + this.state.transcriptId}
          interval= {1000}
          retryCount={3}
          onSuccess={(response) => {
            // A poll/get request was successful
            console.log("Polling successful")
            console.log(response)

            // If the processing isn't complete yet, return true to continue polling
            if(response.status !== "completed")
              return true;
            else
            {
              // The processing is now complete, so update the state with the text and reset transcriptId to null so this transcript isn't processed repeatedly
              let text = response.text;
              this.setState({text, processing: false});
              this.setState({result: this.evaluate(this.preprocess(this.props.text), this.preprocess(text))});
              return false;
            }
          }}
          onFailure={() => {
            // A poll/get request failed
            console.log('Polling failed')
          }}
          method={'GET'}
          headers={{
            authorization: "a1857fd94b0b4671b02ed775f0d3e59b",
            "content-type": "application/json",
          }}
          render={({ startPolling, stopPolling, isPolling }) => {
            // Keep user informed on what is happening
            if(isPolling) {
              return (
                <p style={{width: "50vw", margin: "0 auto"}}>Converting speech to text...</p>
              );
            } else {
              return (
                <p style={{width: "50vw", margin: "0 auto"}}>Conversion complete. Text is: "{this.state.text}"</p>
              );
            }
          }}
        />
      )
    }

    return components;
  }
}

export default Record;
