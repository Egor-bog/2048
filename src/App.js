import React, { Component } from 'react'
import Layout from './UI/Layout'
import Field from './UI/Field/Field'
import ControllPanel from './UI/ControllPanel'
import Button from './UI/Button'
import Score from './UI/Score'
import { moveCells, directions, initCells, removeAndIncreaseCells, populateField, scoreSum, bestScoreF } from './logic'

let newGameFlag = true
class App extends Component {

  constructor(props) {
    super();
    this.state = this.getNewGame()
  }

  mapKeyCodeToDirection = {
    KeyA : directions.LEFT,
    KeyS : directions.DOWN,
    KeyD : directions.RIGHT,
    KeyW : directions.UP,
  }

  
  newGame = () => {
    newGameFlag = true
    if (!localStorage.memory) {
      localStorage.setItem('memory', this.state.score);
    }
    if (localStorage.memory < this.state.score) {
      localStorage.memory = this.state.score
    }
    this.setState(this.getNewGame())
  }

  getNewGame() {
    return {      
      cells : initCells(),
      score : 0, 
      bestScore : bestScoreF(),
    }
  }

  
 
  

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = async event => {
    if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code))
    this.setState(state => ({
      ...state,
      cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.code])
    }))

    await delay(150)
    this.setState(state => ({
      ...state,
      cells: removeAndIncreaseCells(state.cells),
    }))
      this.setState(state => ({
        ...state,
        cells: populateField(state.cells),
      }))
    this.setState(state => ({
      ...state,
      score: scoreSum,
    }))
    newGameFlag = false
  }

  render() {
    const { cells } = this.state;
    return (
      <Layout>
        <ControllPanel>
          <Button onClick={this.newGame}>New Game</Button>
          <Score>Рекорд <br/>  {this.state.bestScore}</Score>
          <Score>Счет <br/>  {this.state.score}</Score>
        </ControllPanel>
        <Field cells={cells} />
      </Layout>  
    )
  }
};
  
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App
export { newGameFlag }

