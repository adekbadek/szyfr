import React from "react"
import ReactDOM from "react-dom"

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const isUpperCase = function(character){
  if (character == character.toUpperCase()) {
    return true
  }
  if (character == character.toLowerCase()){
    return false
  }
}


class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      word: '',
      caesar: 1
    }
  }
  handleInput(e){
    let string = e.target != undefined ? e.target.value : e
    let output = ''

    for (var i = 0; i < string.length; i++) {
      // for each letter in input area
      let letter = string[i]
      if(letter.match(/[A-Za-a]/gi) != null){
        // check if it's a letter
        let original_letter = letter
        // and find it's index in the alphabet
        let index = alphabet.indexOf(letter.toUpperCase())
        // change the letter caesar style - modulo!
        letter = alphabet[(index + this.state.caesar) % alphabet.length]
        // check if it was upper- or lowercase and adjust
        output += isUpperCase(original_letter) ? letter : letter.toLowerCase()
      }else{
        // it's a different char
        output += letter
      }
    }

    // set component state
    this.setState({
      word: output
    })
  }
  handleSelect(e){
    this.setState({ caesar: parseInt(e.target.value) }, function(){
      this.handleInput($('#ta-input').val())
    })
  }
  createOptions(){
    var options = [];
    for (var i = 0; i < alphabet.length; i++) {
      let key = 'option-'+i
      options.push(<option value={i} key={key}>{i}</option>);
    }
    return options
  }
	render() {
		return (
      <div>
        <select value={this.state.caesar} onChange={this.handleSelect.bind(this)}>
          {this.createOptions()}
        </select>
        <textarea onChange={this.handleInput.bind(this)} id='ta-input' />
        <textarea value={this.state.word} id='ta-output' />
      </div>
		);
	}
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
