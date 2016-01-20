import React from "react"
import ReactDOM from "react-dom"

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const init_substitution = function(alphabet){
  let init_s = []
  for (var i = 0; i < alphabet.length; i++) {
    init_s.push([alphabet[i], alphabet[i]])
  }
  return init_s
}


const isUpperCase = function(character){
  if (character == character.toUpperCase()) { return true }
  if (character == character.toLowerCase()){ return false }
}


class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      word: '',
      caesar: 1,
      substitution: init_substitution(alphabet),
      mode: 'substitution'
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
        if(this.state.mode == 'substitution'){

          console.log('sub mode, the pair:')
          console.log(this.state.substitution[index]);
          letter = this.state.substitution[index][1]
          // letter = alphabet[(index + this.state.caesar) % alphabet.length]

        }else if(this.state.mode == 'caesar'){
          // change the letter caesar style - modulo!
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
  handleSelect(e){
    this.setState({ caesar: parseInt(e.target.value) }, function(){
      this.handleInput($('#ta-input').val())
    })
  }
  createOptions(keybase, letters){
    var options = [];
    for (var i = 0; i < alphabet.length; i++) {
      let key = keybase+'-'+i
      if(letters){
        options.push(<option value={alphabet[i]} key={key}>{alphabet[i]}</option>);
      }else{
        options.push(<option value={i} key={key}>{i}</option>);
      }
    }
    return options
  }
  handleSubstChange(e){
    console.log("letter: "+e.target.id+" will become: "+e.target.value);

    let substitutions_array = this.state.substitution
    substitutions_array[alphabet.indexOf(e.target.id)][1] = e.target.value
    this.setState({
      substitution: substitutions_array
    }, function(){
      console.log(this.state.substitution[alphabet.indexOf(e.target.id)]);
      this.handleInput($('#ta-input').val())
    })

  }
  createSubstitutionsUI(){
    let subst_ui = []
    for (var i = 0; i < this.state.substitution.length; i++) {
      let key = 'subst-'+i
      subst_ui.push(
        <div key={key}>
          <span>letter: {this.state.substitution[i][0]}</span>
          <select id={this.state.substitution[i][0]} defaultValue={this.state.substitution[i][0]} onChange={this.handleSubstChange.bind(this)}>
            {this.createOptions('subs-opts', true)}
          </select>
        </div>
      );
    }
    return subst_ui
  }
  handleModeChange(e){
    this.setState({mode:e.target.value})
  }
  setCheckedAttr(mode){
    if(mode == this.state.mode){ return 'defaultChecked' }
  }
  setClass(mode){
    if(mode == this.state.mode){ return 'mode-visible' }
  }
	render() {
		return (
      <div>
        <div>
          <h2>Choose mode:</h2>
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
            <select value={this.state.caesar} onChange={this.handleSelect.bind(this)} id="caesar-select">
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
