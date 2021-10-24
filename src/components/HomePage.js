import React from "react";
import Test from './test';
import {Typography, Button, ButtonGroup, Box} from '@mui/material';

function clickMe(){
    alert('You clicked me!')
}

class HomePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            difficulty: '', //the difficulty is nothing before the user has pressed a button
        }
    }

    render() {
        let test;
        if(this.state.difficulty != '') {
            test = <Test difficulty = {this.state.difficulty}/>
        }
        return (
            <div>
                <Typography variant="h1" component="h1">
                    Languages R U.S.
                </Typography>

                <Box sx={{m: 4}} />

                <ButtonGroup size = "large" variant="contained" aria-label="outlined primary button group">
                    <Button onClick = {() => this.setState({difficulty: "EASY"})}>Easy</Button>
                    <Button onClick = {() => this.setState({difficulty: "MEDIUM"})}>Medium</Button>
                    <Button onClick = {() => this.setState({difficulty: "HARD"})}>Hard</Button>
                </ButtonGroup>
                {test}
            </div>
        );
    } 
}

export default HomePage;

