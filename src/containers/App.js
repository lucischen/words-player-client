import React from 'react'
import './App.css'
import { newBooks } from '../business/cardsLoader'

const LEFT_CODE = 37
const UP_CODE = 38
const RIGHT_CODE = 39 
const DOWN_CODE = 40

const books = newBooks()

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      word: books.Get()
    }

    this.onPage = this.onPage.bind(this)
    this.onRestart = this.onRestart.bind(this)

  }
  componentWillMount () {
    document.addEventListener("keydown", this.onPage, false);
  }

  componentWillUnmount() {
     document.removeEventListener("keyPress", this.onPage, false);
  }

  onRestart() {
    this.setState({ no: 0 })
  }

  onPage(e) {
    const code = e.keyCode
    
    switch(code) {
      case RIGHT_CODE:
        this.setState({ word: books.Next() })
        break;
      case LEFT_CODE:
        this.setState({ word: books.Prev() })
        break;
      case UP_CODE:
        this.setState({ word: books.NextBook() })
        break;
      case DOWN_CODE:
        this.setState({ word: books.PrevBook() })
        break;
      default:
    }
  }

  render() {
    const { word } = this.state

    return (
      <div className="box" onKeyPress={this.rr}>
        <div>
          <div className="wordBox">
            {/* <div className="speech">{word.speech}</div> */}
            <div className="word">{word.word}</div>
          </div>
          <div className="expression">
            {/* <p>{cards[no].chinese}</p> */}
            <p>{word.sentence}</p>
            {/* <p>{cards[no].ChineseSentence}</p> */}
          </div>
        </div>
        {/* <button onClick={this.onRestart}>Restart</button> */}
      </div>
    )
  }
}
