import React from "react";
import Exam from "./Exam";
import Usesetat from "./Usesetat";
import UseRemove from "./UseRemove";
import Basicform from "./Basicform";
import UseEffect from "./UseEffect";
import UseEffect2 from "./UseEffect2";
import HooksApi from "./HooksApi";
import Loading from "./Loading";
import sdata from "./sdata";

// const App = () => (
//     <>
//         {sdata.map((valu, i, arr) => {
//             console.log(arr[i]);
//             return (
//                 <><Basicform />
//                 <UseEffect />
//                 <UseEffect2 />
//                     <Usesetat />
//                     <UseRemove />
//                     <Exam fname={valu.fname} />
//                     <br />
//                     <br />
//                     <br />


//                 </>
//             )
//         })}
//     </>
// );


const App = () => (
    <>
        {sdata.map((valu, i, arr) => {
            // console.log(arr[i]);
            return (
                <>
                    <Basicform />
                    <HooksApi />
                </>
            )
        })}
    </>
);


export default App;

