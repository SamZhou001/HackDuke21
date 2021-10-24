import React from 'react';
import { retrieveAllPosts } from '../api/posts';
import { getScore } from '../api/score';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: '',
            textid: '',
            text: '',
        }
    }
    async componentDidMount() {
        const allData = await retrieveAllPosts();
        const dataForDifficulty = allData.filter(data => data.difficulty === this.props.difficulty);
        const textIndex = Math.floor(Math.random() * dataForDifficulty.length);
        this.setState({
            textid: dataForDifficulty[textIndex].id,
            text: dataForDifficulty[textIndex].content,
        });
    }

    render() {
        return (<div>{this.state.text}</div>)
    }
}

export default Test;