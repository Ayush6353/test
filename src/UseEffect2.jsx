import React, { useEffect, useState } from 'react'
const main ={
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}
const UseEffect2 = () => {

    const [windowSize, setwindowSize] = useState(window.screen.width);


    const addEvent = () => {
        setwindowSize(window.innerWidth);
    };

    useEffect (() => {
        window.addEventListener('resize', addEvent);

        return () => {  
            window.removeEventListener('resize', addEvent);
        }
    },)

  return (
    <div style={main}>
        <h1>The actual size of the window is:</h1>
        <h3>{windowSize}</h3>
    </div>
  )
}

export default UseEffect2;