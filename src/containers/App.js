import React from 'react'
import './App.css'
import { newBooks } from '../business/cardsLoader'
import Swipeable from 'react-swipeable'

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

  // mobile flick 
  swipedLeft(e, absX, isFlick) {
    if(isFlick) {
      this.setState({ word: books.Next() })
    }
  }
  swipedRight(e, absX, isFlick) {
    if(isFlick) {
      this.setState({ word: books.Prev() })
    }
  }
  swipedUp(e, absY, isFlick) {
    if(isFlick) {
      this.setState({ word: books.PrevBook() })
    }
  }
  swipedDown(e, absY, isFlick) {
    if(isFlick) {
      this.setState({ word: books.NextBook() })
    }
  }

  onRestart() {
    this.setState({word: books.ReStart()})
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

  // TODO: 
  // 1) Switch compoent by book type to display different info.
  // 
  render() {
    const { word } = this.state
    let c = books.Counter()
    
    return (
      <Swipeable
        onSwipedLeft={(e, absX, isFlick) => {this.swipedLeft(e, absX, isFlick)}}
        onSwipedRight={(e, absX, isFlick) => {this.swipedRight(e, absX, isFlick)}}
        onSwipedUp={(e, absY, isFlick) => {this.swipedUp(e, absY, isFlick)} }
        onSwipedDown={(e, absY, isFlick) => this.swipedDown(e, absY, isFlick)} >

        <div className="box" onKeyPress={this.rr}>
          <div>
            <div className="wordBox">
              <div className="counter">{c.no + 1  + "/" + c.total}</div>
              <div className="word">{word.word}</div>
            </div>
            <div className="expression">
              {/* <p>{cards[no].chinese}</p> */}
              <p className="sentence">{word.sentence}</p>
              {/* <p>{cards[no].ChineseSentence}</p> */}
            </div>
          </div>
          <button className="restart" onClick={this.onRestart}>Restart</button>
          <div>
          <p className="tips">level {word.level} - page {word.page}</p>
          </div>
        </div>
      </Swipeable>
    )
  }
}
