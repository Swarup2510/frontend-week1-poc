import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState("hello World");
  const [color, setColor] = useState("black");

  const changeStyle = () => {
    setText("Swarup here" );
    setColor("blue");
  };


  return (
    <h1 style={{color}} onClick={changeStyle}>
      {text}

    </h1>
  );
}

export default App
