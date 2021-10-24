import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";
import styled from "styled-components";

function clickMe(){
    alert('You clicked me!')
}

class HomePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            difficulty: '',
        }
    }

    chooseDifficulty = (difficulty) => {
        this.setState({difficulty})
    }


    render() {
        let test;
        if(this.state.difficulty != '') {
            test = <Test difficulty = {this.state.difficulty}/>
        }
        return (
            <>
                <div>
                    <button onClick = {this.chooseDifficulty("EASY")}>
                    Easy
                    </button>
                </div>
                <div>
                    <button onClick = {this.chooseDifficulty("MEDIUM")}>
                    Medium
                    </button>
                </div>
                <div>
                    <button onClick = {this.chooseDifficulty("HARD")}>
                    Hard
                    </button>
                </div>
                {test}
            </>
        );
    } 
}

export default HomePage;

