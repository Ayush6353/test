import React, { useState } from 'react'

const Usesetat = () => {
   const [Myupdate, setUpdate] = useState({
    name: 'ayush', age : 36, year : 2003
   });

   const OnUpdate = () => {
    setUpdate({...Myupdate,   name: "raj",age: 26, year: 2023});
   };

  return (
    <div>
        <h2>name :{Myupdate.name} & age : {Myupdate.age} & year : {Myupdate.year}</h2>
        <button className='button_f1' onClick={OnUpdate}>Update</button>
    </div>
  )
}

export default Usesetat;