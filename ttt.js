'use strict';

const e = React.createElement;

function Square(props) {
  return /*#__PURE__*/React.createElement("button", {
    className: "square",
    onClick: props.onClick
  }, props.value);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = 'X';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  AIplay() {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares)) {
      return;
    }

    while (true) {
      let a = check(squares);
      if (squares[a] == null) {
        squares[a] = 'O';
        break;
      }
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    if (this.state.xIsNext) {
      return /*#__PURE__*/React.createElement(Square, {
        value: this.state.squares[i],
        onClick: () => this.handleClick(i)
      });
    } else {
      return /*#__PURE__*/React.createElement(Square, {
        value: this.state.squares[i],
        onClick: () => this.AIplay()
      });
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else if (checkDraw(this.state.squares)) {
      status = 'Draw~!';
    } else {
      status = this.state.xIsNext ? 'Click to place your X' : 'Click for computer to play O';
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "status"
    }, status), /*#__PURE__*/React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)), /*#__PURE__*/React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)), /*#__PURE__*/React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8)));
  }

}

class Game extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "game"
    }, /*#__PURE__*/React.createElement("div", {
      className: "game-board"
    }, /*#__PURE__*/React.createElement(Board, null)), /*#__PURE__*/React.createElement("div", {
      className: "game-info"
    }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("ol", null)));
  }

}

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function check(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] == null) {
      squares[i] = 'X';

      if (calculateWinner(squares)) {
        squares[i] = null;
        return i;
      }

      squares[i] = null;
    }
  }

  return Math.round(Math.random() * 8);
}

function checkDraw(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] == null) {
      return false;
    }
  }

  return true;
} // ========================================


ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById('root'));
