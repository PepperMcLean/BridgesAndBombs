import './App.css';
import Board from './components/Board';
import Title from './components/Title';
import Rules from './components/Rules';

function App() {
  return (
    <div className="App">
      <div className="split left">
        <div className="centered">
          <Title/>
          <Board/>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <Rules/>
        </div>
      </div>
    </div>
  );
}

export default App;
