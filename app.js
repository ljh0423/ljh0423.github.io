// App.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './app.css';

function App() {
  const [toggle, setToggle] = useState(false);

  // Define animation properties
  const props = useSpring({
    to: { opacity: toggle ? 1 : 0, transform: toggle ? 'translateX(0)' : 'translateX(100px)' },
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Juhyun Lee</h1>
        <p>Welcome to my website!</p>
      </header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">NLP</a></li>
          <li><a href="#">2D Game</a></li>
          <li><a href="#">Chatbot</a></li>
          <li><a href="#">Three.js</a></li>
        </ul>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h2>About Me</h2>
            <p>I am an aspiring software developer who likes to travel the universe. I would like to experience more throughout this journey, and I hope you can be a part of it too.</p>
          </div>
          <div className="col-sm-8">
            <h2>Tic-Tac-Toe</h2>
            <p>Click on the link to play <a href="ttt.html">Tic-Tac-Toe</a></p>
            <p>See if you can figure out a strategy.</p>
            <animated.div style={props}>Move me!</animated.div>
            <button onClick={() => setToggle(!toggle)}>Toggle Animation</button>
          </div>
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <p>Tel.(+1)519-781-8962 | Adr.300 Ginseng St. Waterloo | <a href="mailto:j866lee@uwaterloo.ca">j866lee@uwaterloo.ca</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
