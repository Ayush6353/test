import React, { useState } from "react";

const UseRemove = () => {
  const Main_data = [
    { id: 0, name: "ayush", age: 36, year: 2003 },
    { id: 1, name: "raj", age: 25, year: 2008 },
    { id: 2, name: "meet", age: 18, year: 2004 },
  ];
  const [Myremove, setremove] = useState(Main_data);
  const onClear = () => {
    setremove([]);
  };

  const OnRemove = (id) => {
  alert(id);
  const MyNewData = Myremove.filter((val) => {
    return val.id !== id;
  } );
  setremove(MyNewData);
  };
  return (
    <>
      {Myremove.map((val) => {
        return (
            <div className="remove_main">
          <h2 key={val.id}>
            name :{val.name} & age : {val.age} & year : {val.year}
          </h2>
          <button className="removeBtn" onClick={  () => OnRemove(val.id)}>remove</button>
          </div>
        );
      })}
      <button className="button_f1" onClick={onClear}>
        cleardata
      </button>
    </>
  );
};

export default UseRemove;
