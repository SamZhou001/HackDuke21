import React from "react";

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import textList from '../text.json';
import Record from '../Record';
import TextToSpeech from '../TextToSpeech';

class HomePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            allData: textList,
            difficulty: '', //the difficulty is nothing before the user has pressed a button
        }
    }

    render() {
        let displayedText = '';
        if (this.state.difficulty) {
            displayedText = this.state.allData[this.state.difficulty];
        }
        return (
            <Grid container direction="column" alignItems='center'>
                <Typography variant='h3' mt={5} fontFamily='Apple Chancery'> {'English Pronunciation Helper'} </Typography>
                <Grid container direction="column" alignItems='center' mt={2} spacing={2}>
                    <Grid item xs={12}>
                        <Tabs
                            onChange={(event, value) => this.setState({difficulty: value})}
                            value={this.state.difficulty}
                        >
                            <Tab
                                value={'EASY'}
                                label={'EASY'}
                                wrapped
                                sx={{
                                    fontSize: 15,
                                }}
                            />
                            <Tab
                                value={'MEDIUM'}
                                label={'MEDIUM'}
                                wrapped
                                sx={{
                                    fontSize: 15,
                                }}
                            />
                            <Tab
                                value={'HARD'}
                                label={'HARD'}
                                wrapped
                                sx={{
                                    fontSize: 15,
                                }}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} mx={10}>
                        {this.state.difficulty? <div>
                            <Typography fontSize={20} fontFamily='Open Sans'> {displayedText} </Typography>
                            <br></br>
                            <TextToSpeech text={displayedText}></TextToSpeech>
                            <br></br>
                            <Record text={displayedText}/>
                            
                        </div> : <div></div>}
                        
                    </Grid>
                </Grid>
            </Grid>
        );
    } 
}

export default HomePage;