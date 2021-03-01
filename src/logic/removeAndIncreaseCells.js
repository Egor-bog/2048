import {cellStates} from './cellManager'
import { newGameFlag } from '../App'


let scoreSum = 0

function removeAndIncreaseCells (cells) {
  if (newGameFlag) scoreSum = 0
  return cells.filter(cell => cell.state !== cellStates.DYING).map(cell => {
    if (cell.state === cellStates.INCREASE) {
      cell.value *= 2
      scoreSum += cell.value
    }

    cell.state = cellStates.IDLE

    return cell
  })
}

export {removeAndIncreaseCells, scoreSum} 
