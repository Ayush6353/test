import React, { useEffect, useState } from 'react'

const UseEffect = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {

        if (count !== 0) {
            document.title = `chats (${count})`;
        } else {
            document.title = `chats`;
        }
    });

    return (
        <div>
            <h1>{count}</h1>
            <button className='button_f2' onClick={
                () => setCount(count + 1)
            }> Click 👍</button>
        </div>
    )
}

export default UseEffect