import React, { useState, useEffect } from 'react';

import './App.css';

function App() {

  const [currentKey, setCurrentKey] = useState('');
  const [nextKey, setNextKey] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const keySequence = 'asdfjkl;';

  useEffect(() => {
    setNextKey(keySequence.charAt(0));
    setStartTime(Date.now());
  }, []);

  const handleKeyPress = (event) => {
    const { key } = event;

    if (key === nextKey) {
      setKeysPressed(keysPressed + 1);
      setNextKey(keySequence.charAt(keysPressed + 1));

      if (keysPressed + 1 === keySequence.length) {
        setEndTime(Date.now());
        calculateAccuracy();
      }
    }
  };

  const calculateAccuracy = () => {
    const totalKeys = keySequence.length;
    const incorrectKeys = totalKeys - keysPressed;
    const calculatedAccuracy = ((keysPressed - incorrectKeys) / keysPressed) * 100;
    setAccuracy(calculatedAccuracy.toFixed(2));
  };

  return (
    <div className="App">
      <h1 className='heading'>Touch Typing App</h1>
      <p>Type the following keys:</p>
      <div>
      <button className="nextkey">{nextKey}</button>
      </div>
      <input type="text" onKeyPress={handleKeyPress} placeholder='Re-type if failed'/>
      {endTime > 0 && (
        <div>
          <p>Number of keys pressed: {keysPressed}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Elapsed time: {((endTime - startTime) / 1000).toFixed(2)} seconds</p>
        </div>
      )}
      <div>
      <button className="button">
        <a href="">Chaabi Type</a>
        </button>
        </div>
    </div>
  );
}

export default App;
