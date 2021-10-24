import React from "react";

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { retrieveAllPosts } from '../api/posts';
import Record from '../Record';
import TextToSpeech from '../TextToSpeech'

class HomePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            allData: [],
            difficulty: '', //the difficulty is nothing before the user has pressed a button
        }
    }

    async componentDidMount() {
        document.title = "English Pronounciation Helper";
        //const allData = await retrieveAllPosts();
        const allData = []
        this.setState({
            allData,
        });
    }

    render() {
        const dataForDifficulty = this.state.allData.filter(data => data.difficulty === this.state.difficulty);
        const textIndex = Math.floor(Math.random() * dataForDifficulty.length);
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
                            <Typography fontSize={20} fontFamily='Open Sans'> {'Humans have extensively used the coastal zone for fishing, tourism, transport of goods, water treatment, and housing. Agriculture has benefited from the exceptionally fertile grounds due to marine deposits. Approximately three billion people, half the world’s population, live and work within a couple of hundred kilometers of a coastline, notwithstanding the vulnerability of coastal areas to flooding.'} </Typography>
                            <br></br>
                            <TextToSpeech text="Humans have extensively used the coastal zone for fishing, tourism, transport of goods, water treatment, and housing. Agriculture has benefited from the exceptionally fertile grounds due to marine deposits. Approximately three billion people, half the world’s population, live and work within a couple of hundred kilometers of a coastline, notwithstanding the vulnerability of coastal areas to flooding."></TextToSpeech>
                            <br></br>
                            <Record text={'Humans have extensively used the coastal zone for fishing, tourism, transport of goods, water treatment, and housing. Agriculture has benefited from the exceptionally fertile grounds due to marine deposits. Approximately three billion people, half the world’s population, live and work within a couple of hundred kilometers of a coastline, notwithstanding the vulnerability of coastal areas to flooding.'}/>
                            
                        </div> : <div></div>}
                        
                    </Grid>
                </Grid>
            </Grid>
        );
    } 
}

export default HomePage;

//dataForDifficulty[textIndex].content
//dataForDifficulty[textIndex].id