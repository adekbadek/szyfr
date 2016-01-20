import React from "react"
import ReactDOM from "react-dom"

import Component from './Component';

let isLetter = (keyCode) => {
  return (65 <= keyCode && keyCode <= 90);
}

class Game extends React.Component{
  constructor(props){
    super(props)
  }
  handleKeyup(e){
    let {keyCode} = e;

    // return if it's not a letter 
    if(!isLetter(keyCode)) {
      return;
    }

    console.log(String.fromCharCode(e.keyCode));
  }
  componentDidMount() {
    window.addEventListener("keyup",this.handleKeyup.bind(this))
  }
	render() {
		return (
      <div>
        Yo
        <Component />
      </div>
		);
	}
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
