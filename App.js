import React, {useState} from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const App = () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operation, setOperation] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  addDigit = n => {
    let displayValueAux = displayValue
    let clearDisplayAux = clearDisplay
    let valuesAux = [...values]

    clearDisplayAux = displayValueAux === '0' || clearDisplayAux

    if (n === '.' && !clearDisplayAux && displayValueAux.includes('.')) {
      return
    }

    const currentValue = clearDisplayAux ? '' : displayValueAux
    displayValueAux = currentValue + n

    setValues(() => {
      if (n != '.') {
        const newValue = parseFloat(displayValueAux)
        valuesAux[current] = newValue
        return valuesAux
        } 
        else {
          return values
        }
      }
    )

    setClearDisplay(false)
    setDisplayValue(displayValueAux)
    
    
  }

  clearMemory = () => {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0])
    setCurrent(0)
  }

  setOperationButton = operationButton => {
      let operationAux = operationButton
      let currentAux = current
      let clearDisplayAux = clearDisplay
      let displayValueAux = displayValue
      let valuesAux = [...values]    
    
    if (currentAux === 0) {
      operationAux = operationButton
      currentAux = 1
      clearDisplayAux = true

    } else {
      const equals = operationButton === '='
      try {
        valuesAux[0] = eval(`${valuesAux[0]} ${operation} ${valuesAux[1]}`)
      } catch(e) {
        valuesAux[0] = values[0]
      }
      valuesAux[1] = 0
      displayValueAux = `${valuesAux[0]}`
      operationAux = equals ? null : operationAux
      currentAux = equals ? 0 : 1
      clearDisplayAux = true
    }
    setOperation(operationAux)
    setCurrent(currentAux)
    setClearDisplay(clearDisplayAux)
    setDisplayValue(displayValueAux)
    setValues(valuesAux)

  }

    return (
        <View style={styles.container}>
          <Display value={displayValue} />
          <View style={styles.buttons}>
            <Button label='AC' triple onClick={clearMemory} />
            <Button label='/' operationButton onClick={setOperationButton}/>
            <Button label='7' onClick={addDigit}/>
            <Button label='8' onClick={addDigit}/>
            <Button label='9' onClick={addDigit}/>
            <Button label='*' operationButton onClick={setOperationButton}/>
            <Button label='4' onClick={addDigit}/>
            <Button label='5' onClick={addDigit}/>
            <Button label='6' onClick={addDigit}/>
            <Button label='-' operationButton onClick={setOperationButton}/>
            <Button label='1' onClick={addDigit}/>
            <Button label='2' onClick={addDigit}/>
            <Button label='3' onClick={addDigit}/>
            <Button label='+' operationButton onClick={setOperationButton}/>
            <Button label='0' double onClick={addDigit}/>
            <Button label='.' onClick={addDigit}/>
            <Button label='=' operationButton onClick={setOperationButton}/>
          </View>
        </View>
      )
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default App