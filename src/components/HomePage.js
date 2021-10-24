import React from "react";
import Test from './test';
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

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
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>

                <div>
                    <button onClick = {() => this.setState({difficulty: "EASY"})}>
                    Easy
                    </button>
                </div>
                <div>
                    <button onClick = {() => this.setState({difficulty: "MEDIUM"})}>
                    Medium
                    </button>
                </div>
                <div>
                    <button onClick = {() => this.setState({difficulty: "HARD"})}>
                    Hard
                    </button>
                </div>
                {test}
            </div>
        );
    } 
}

export default HomePage;

