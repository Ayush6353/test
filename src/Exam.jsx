import React, { useState } from "react";

const name = "Hello";
const lname = "World";
const date = new Date().toLocaleDateString();
let time = new Date().toLocaleTimeString();
// let curDate = new Date(2023,6,29, 20);
let curDate = new Date();
curDate = curDate.getHours();
let greeting = "";
const cssStyle = {};

if (curDate >= 1 && curDate < 12) {
    greeting = "Good morning";
    cssStyle.color = "green";
} else if (curDate >= 12 && curDate < 19) {
    greeting = "Good evening";
    cssStyle.color = "red";
} else {
    greeting = "Good night";
    cssStyle.color = "Black";
}




const GM = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5rem",
    width: "20rem",
    backgroundColor: "transparent",
    borderRadius: "1rem",
    textAlign: "center",
    // boxShadow: "0px 8px 15px #000000ad",
}


function Exam(props) {

    const state = useState(0);

    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [Fullname, setFullname] = useState("");
    const [Lastname, setLastname] = useState("");

    const InClick = () => {
        setCount(count + 1);
    };

    const inputevent = (inputvalu) => {
        console.log(inputvalu.target.value);
        setName(inputvalu.target.value);
    };
    const inputevent2 = (inputvalu2) => {
        console.log(inputvalu2.target.value);
        setLname(inputvalu2.target.value);
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        setFullname(name);
        setLastname(lname)
    };

    const bioData = [
        { name: "ayush", age: 28 },
        { name: "jay", age: 19 },
    ];
    
    const [myArr, setmyArr] = useState(bioData);
    const clearArr = () => {
        setmyArr([]);
    }

    return (
        <>
            {
                myArr.map((bioVlu) => {
                    return <h2> Name : {bioVlu.name} & Age : {bioVlu.age} </h2>
                })
            }
            <br />
            <br />
            <button className="button_f1" onClick={clearArr} >clear Arr</button>
            <br />
            <h1>{count}</h1>
            <h1 contentEditable="true">Hii {name + " " + lname} </h1>
            <p>lucky number :- {Math.random()}</p>
            <p>today date is {date}</p>
            <p>today date is {time}</p>
            <h1>{`My name is ${name} ${lname}.`}</h1>
            {/* <div style={GM}>
                <h1><samp style={cssStyle}>{greeting}</samp></h1>
            </div> */}
            <h1>{props.fname}</h1>
            <form className="form_m1" onSubmit={OnSubmit}>
                <div className="form_d1">
                    <h1 className="tital_f1"><samp style={cssStyle}>{greeting}</samp>  {Fullname + " " + Lastname}</h1>
                    <input type="text" className="input_f1" placeholder="Enter your name" onChange={inputevent} value={name} />
                    <br />
                    <br />
                    <input type="text" className="input_f1" placeholder="Enter your Last name" onChange={inputevent2} value={lname} />
                    <br />
                    <br />
                    <button className="button_f1" type="submit">Click Me</button>
                </div>
            </form>
        </>
    );
}

export default Exam;
