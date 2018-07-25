import React from 'react'
import cardCollection from '../cards/a'
import './App.css'
import { loader } from '../business/cardsLoader'

const LEFT_CODE = 37
const UP_CODE = 38
const RIGHT_CODE = 39 
const DOWN_CODE = 40

const cards = loader()

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      totalCard: cardCollection.a.length,
      cards: cardCollection.a,
      no: 0
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
    const { no, totalCard } = this.state
    const code = e.keyCode
    
    let next = code === RIGHT_CODE ? no + 1 : no - 1 
    if(next >= 0 && next < totalCard) {
      this.setState({ no: next })
    }
  }

  render() {
    const { cards, no } = this.state

    return (
      <div className="box" onKeyPress={this.rr}>
        <div>
          <div className="wordBox">
            <div className="speech">{cards[no].speech}</div>
            <div className="word">{cards[no].word}</div>
          </div>
          <div className="expression">
            <p>{cards[no].chinese}</p>
            <p>{cards[no].EnglishSentence}</p>
            <p>{cards[no].ChineseSentence}</p>
          </div>
        </div>
        <button onClick={this.onRestart}>Restart</button>
      </div>
    )
  }
}
