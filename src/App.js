import logo from './logo.svg';
import './App.css';
import Record from './Record';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Record></Record>
      </header>
      <Test difficulty='MEDIUM'/>
    </div>
  );
}

export default App;
