import React from "react"
import ReactDOM from "react-dom"

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

// Create initial substitution - every letter is substituted by itself (e.g. A=A, B=B, etc.)
const init_substitution = function(alphabet){
  let init_s = []
  for (var i = 0; i < alphabet.length; i++) {
    init_s.push([alphabet[i], alphabet[i]])
  }
  return init_s
}

// check if letter is uppercase
const isUpperCase = function(character){
  if (character == character.toUpperCase()) { return true }
  if (character == character.toLowerCase()){ return false }
}

class Game extends React.Component{
  constructor(props){
    super(props)
    // set initial State
    this.state = {
      word: '',
      caesar: 1,
      substitution: init_substitution(alphabet),
      mode: 'substitution'
    }
  }
  // Handle the first textbox input
  handleInput(e){
    let string = e.target != undefined ? e.target.value : e
    let output = ''

    for (var i = 0; i < string.length; i++) {
      // for each letter in input area
      let letter = string[i]
      if(letter.match(/[A-Za-a]/gi) != null){
        // it's a letter
        let original_letter = letter
        // and find it's index in the alphabet
        let index = alphabet.indexOf(letter.toUpperCase())
        if(this.state.mode == 'substitution'){
          // substitution mode
          letter = this.state.substitution[index][1]
        }else if(this.state.mode == 'caesar'){
          // caesar mode
          letter = alphabet[(index + this.state.caesar) % alphabet.length]
        }
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
  // Select for how many letters the caesar shifts
  handleCaesarSelect(e){
    this.setState({ caesar: parseInt(e.target.value) }, function(){
      // update the deciphering
      this.handleInput($('#ta-input').val())
    })
  }
  // Create options for a select element
  createOptions(keybase, letters){
    var options = [];
    for (var i = 0; i < alphabet.length; i++) {
      // in React, iteratively created elements must have key props
      let key = keybase+'-'+i
      if(letters){
        options.push(<option value={alphabet[i]} key={key}>{alphabet[i]}</option>);
        if(i == alphabet.length-1){
          // push last option - a dash for replacing conflicting letters
          options.push(<option value='-' key={key+'-dash'}>-</option>)
        }
      }else{
        options.push(<option value={i} key={key}>{i}</option>)
      }
    }
    return options
  }
  handleSubstChange(e){
    let sub_array = this.state.substitution
    let sub_pair = sub_array[alphabet.indexOf(e.target.id)]
    // set new value
    sub_pair[1] = e.target.value
    // update State
    this.setState({
      substitution: sub_array
    }, function(){
      // check for conflicts - when X=X changing another letter to X
      for (var i = 0; i < sub_array.length; i++) {
        if(e.target.value == sub_array[i][0] && sub_array[i][0] == sub_array[i][1]){
          $($('#'+e.target.value).parent()).addClass('conflict')
          // update State for conflicted select
          sub_array[i][1] = '-'
          this.setState({substitution: sub_array}, function(){
            // set the value
            $('#'+e.target.value).val('-')
          })
        }
      }
      // UI - highlight the changed select and remove conflict class
      if(sub_pair[0] == sub_pair[1]){
        $($('#'+e.target.id).parent()).removeClass('changed')
      }else{
        $($('#'+e.target.id).parent()).addClass('changed').removeClass('conflict')
      }
      // update I/O
      this.handleInput($('#ta-input').val())
    })
  }
  // The UI - selects for each letter in the alphabet
  createSubstitutionsUI(){
    let subst_ui = []
    for (var i = 0; i < this.state.substitution.length; i++) {
      let key = 'subst-'+i
      subst_ui.push(
        <div key={key}>
          <span>{this.state.substitution[i][0]} <span className='html-ent'>&#8594;</span></span>
          <select id={this.state.substitution[i][0]} defaultValue={this.state.substitution[i][0]} onChange={this.handleSubstChange.bind(this)}>
            {this.createOptions('subs-opts', true)}
          </select>
        </div>
      )
    }
    return subst_ui
  }
  // Choose mode - Substitutions or Caesar
  handleModeChange(e){
    this.setState({mode:e.target.value}, function(){
      this.handleInput($('#ta-input').val())
    })
  }
  // helpers for setting attrs and classes
  setCheckedAttr(mode){
    if(mode == this.state.mode){ return 'defaultChecked' }
  }
  setClass(mode){
    if(mode == this.state.mode){ return 'mode-visible' }
  }
  // Finally, render the component
	render() {
		return (
      <div>
        <div>
          <h2>Mode:</h2>
          <form id="choose" onChange={this.handleModeChange.bind(this)}>
            <input type="radio" name="mode" value="substitution"
            defaultChecked={this.state.mode == 'substitution'} /> Substitutions <br />
            <input type="radio" name="mode" value="caesar"
            defaultChecked={this.state.mode == 'caesar'} /> Caesar
          </form>
        </div>

        <div className='modes'>
          <div className={this.setClass('substitution')}>
            <h2>Substitutions:</h2>
            <div className="substitutions">
            {this.createSubstitutionsUI()}
            </div>
          </div>

          <div className={this.setClass('caesar')}>
            <h2>Caesar:</h2>
            <select value={this.state.caesar} onChange={this.handleCaesarSelect.bind(this)} id="caesar-select">
            {this.createOptions('opts', false)}
            </select>
          </div>
        </div>

        <div>
          <h2>I/O:</h2>
          <textarea onChange={this.handleInput.bind(this)} id='ta-input' />
          <textarea value={this.state.word} id='ta-output' />
        </div>
      </div>
    );
	}
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
