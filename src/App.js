import React, {Component} from 'react';
import './App.css';
import Toolbar from './components/Toolbar';

class App extends Component {
  render() {
    return (
      <div>
      <header>
        <Toolbar />
      </header>
    </div>);
  }
}

export default App;
