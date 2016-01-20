import React from "react"
import ReactDOM from "react-dom"

import Component from './Component';

class Game extends React.Component{
  constructor(props){
    super(props)
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
