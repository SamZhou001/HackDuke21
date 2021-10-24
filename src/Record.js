// Adapted from https://github.com/Matheswaaran/react-mp3-audio-recording

import './Record.css';
import react from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import firebaseApp from './firebase.js';
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as refDatabase, child, get, set } from "firebase/database";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Record extends react.Component {

  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      checkPermissionFailed: false,
    };
    this.timer = null;
  }

  // Start recording
  start = () => {
    // Make sure microphone permission is given
    if (this.state.isBlocked) {
      console.log('Permission Denied (start 1)');
    } else {
        // Start recording and update state
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => {
            console.log("Permisson Denied (start 2)");
            this.getAudioPermissions();
        });
    }
  };

  // Stop recording, upload recording to Firebase, call thefluent API with recording url
  stop = () => {

    // Stop recording
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // Get a buffer and blob that contain the recording

        // Firebase database reference
        const dbRef = refDatabase(getDatabase(firebaseApp));
        
        // Get the recording number from the Firebase database, which will be the filename of this recording
        get(child(dbRef, "recordingNum")).then((snapshot) => {
            if (snapshot.exists()) {
                // recordingNum retreived successfully
                console.log("recordingNum retrieved successfully: " + snapshot.val());
                
                // Upload this recording to Firebase storage with filename recordingNum + ".mp3"
                let recordingNum = snapshot.val();
                const storageRef = refStorage(getStorage(firebaseApp), recordingNum + ".mp3");
                uploadBytes(storageRef, blob).then((snapshot) => {
                    // Recording uploaded successfully
                    console.log("Uploaded recording " + recordingNum + " successfully");
                    
                    // Get the url of the uploaded recording to pass to thefluent API
                    getDownloadURL(storageRef).then((url) => {
                        // Url retrieved successfully
                        console.log("Recording url: " + url);

                        // TODO: Call thefluent API
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

        // Create url of blob of recording
        const blobURL = URL.createObjectURL(blob)
        console.log(blobURL)

        // Update the state with url of blob and stopped recording
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  // Get microphone permission when component loads
  componentDidMount() {
    this.getAudioPermissions();
  }

  // Check if microphone permission given; if not, display error message
  checkPermission = () => {
    // Check if microphone permission given
    this.getAudioPermissions();

    // If microhpone permission not given, show error message for 3 seconds
    if(this.state.isBlocked)
    {
        // Remove timeout for previous error message (if still showing on screen)
        clearTimeout(this.timer)
        
        // Update the state to show error message
        this.setState({ checkPermissionFailed: true })

        // Set a timer to hide error message afte 3 seconds
        this.timer = setTimeout(() => {
            this.setState({checkPermissionFailed: false});
        }, 3000);
    }
  }

  // Ask the browser to get microphone permission
  // First time, browser will prompt user to give permission 
  // If permission not given first time, browser will not show prompt and will just return that permission is not granted
  getAudioPermissions = () => {
    navigator.getUserMedia({ audio: true },
      () => {
        // Permission granted
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        // Permission denied
        console.log('Permission Denied (get)');
        this.setState({ isBlocked: true })
      },
    );
  }

  render() {
    let recordingUI;
    
    // If the user has given microphone access, show the UI to record audio
    if(!this.state.isBlocked)
    {
      recordingUI = [
        
      ];
    }
    // If the user has not given microhpone access, display a message indicating as such and button to check for permissions again
    else
    {
      // Display the error message if it should be displayed
      if(this.state.checkPermissionFailed)
        recordingUI.push(<p key="recording-check-permission-failed" className="Check-permission-failed">Failed. Microhpone access not yet granted.</p>)
    }

    return (
      <>
        <Grid container mt={2} direction="column" alignItems='center'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <audio key="recording-playback" src={this.state.blobURL} controls="controls" />
            </Grid>
            <Grid item xs={12}>
              <Button key="recording-button-record" onClick={this.start} disabled={this.state.isRecording}>Record</Button>
              <Button key="recording-button-stop" onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Record;
