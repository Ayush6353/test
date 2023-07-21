import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteOutlined } from '@ant-design/icons';
const { Column } = Table;


const getLocalStorage = () => {
    let List = localStorage.getItem('list');
    console.log('list');

    if (List) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
};

const Basicform = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const [editBtn, setEditBtn] = useState(true);
    const [allfachData, setAllfachData] = useState(getLocalStorage());
    const [EditID, setEditID] = useState(null);

    const FormSubmit = (e) => {
        e.preventDefault();
        let patt = /^[A-Za-z1-100._]{4,}[0-9]{0,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
        let passPatt = /^[A-Za-z]{0,}[0-9]{0,}[A-Za-z]{0,}@/;
        if (!password && !email) {
            seterror("**enter your email and password!");
            toast.error("**enter your email and password!", { theme: "colored" });
        }
        else if (!patt.test(email)) {
            seterror("**enter your correct email!");
            toast.error("**enter your correct email!", { theme: "colored" });
        }
        else if (!passPatt.test(password)) {
            seterror("**enter your correct password!");
            toast.error("**enter your correct password!", { theme: "colored" });
        }
        else if (!password) {
            seterror("**enter your password!");
            toast.error("**enter your password!", { theme: "colored" });

        }
        else if (password.length < 6) {
            seterror("**enter your 6 digit password!");
            toast.error("**enter your 6 digit password!", { theme: "colored" });

        }
        else if (!email) {
            seterror("**enter your email !");
            toast.error("**enter your email !", { theme: "colored" });
        }
        else if (email && password && !editBtn) {
            setAllfachData(
                allfachData.map((record) => {
                    if (record === (EditID)) {
                        return { ...record, email: email, password: password }
                    }
                    return record;
                })

            )
            setEditBtn(true);
            setEmail("");
            setPassword("");
            setEditID(null);
        }
        else if (email && password && !editBtn) {
            setAllfachData(
                allfachData.map((elm) => {
                    if (elm.id == (EditID+1)) {
                        return { ...elm, email: email, password: password}
                    }
                    return elm;
                })

            )
            setEditBtn(true);
            setEmail("");
            setPassword("");
            setEditID(null);
        }
        else {
            const NewfachData = { id: allfachData.length + 1, email: email, password: password }
            // console.log(allfachData.length+1);/

            setAllfachData([...allfachData, NewfachData]);

            setEmail("");        // reset data
            setPassword("");     // reset data
            seterror("");        // reset data
            toast.success("**success!", { theme: "colored" });
        }
    }



    const removeData = (id) => {
        const updateData = allfachData.filter((elm, ind) => {

            return ind !== id;

        })
        setAllfachData(updateData);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(allfachData))
    }, [allfachData],);


    const onantdEdit = (record) => {
        let newData = allfachData.filter((edit_s) => {
            return edit_s.id === record.id
        });
        setEditBtn(false);
        setEmail(newData[0].email);
        setPassword(newData[0].password);
        setEditID(record);
        console.log(newData[0].email, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    }


    const onEdit = (id) => {
        let newEditData = allfachData.filter((elm, ind) => {
            return ind === id
        });
        setEditBtn(false);
        setEmail(newEditData[0].email);
        setPassword(newEditData[0].password);
        setEditID(id);
    };


    const onDeleteOutlined = (record) => {
        Modal.confirm({
            title: "are you sure you want to delete",
            onOk: () => {
                setAllfachData((allfachData) => {
                    return allfachData.filter((delet_s) => delet_s.id !== record.id);
                })
            }
        })

    }



    //=============== CSS ========================//
    const styy = {
        color: "red",
    }
    //============================================//
    return (
        <div>
            <form className="form_m1" onSubmit={FormSubmit} >
                <div className="form_d1">
                    <h1>Login Form</h1>
                    <br />
                    <input type="text" className="input_f1" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <input type="text" className="input_f1" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    {
                        editBtn ? <button className="button_f1" title='login' type="submit">Login</button> :
                            <button className="button_f1" title='Edit' type="submit">Edit</button>
                    }

                    <label style={styy}>{error}</label>
                </div>
            </form>
            <br />
            <br />
            <div className='antd_main'>
                <div className='antd'>
                    <Table dataSource={allfachData}>
                        <Column title="ID" dataIndex="id" key="id   " />
                        <Column title="EMAIL" dataIndex="email" key="email" />
                        <Column title="PASSWORD" dataIndex="password" key="password" />
                        <Column
                            title="ACTION"
                            key="action"
                            render={(record) => (
                                <Space size="middle">
                                    <Button onClick={() => { onantdEdit(record) }}>Edit</Button>
                                    <Button onClick={() => { onDeleteOutlined(record) }}>Delete</Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </div>
            {
                allfachData.map((inputData, ind) => {
                    return (
                        <div className='main_input'>
                            <br />
                            <div className='remove_main' key={inputData.ind}>
                                <h4 className='h4_form'>{inputData.id}</h4>
                                <h4 className='h4_form'>{inputData.email}</h4>
                                <h4 className='h4_form'>{inputData.password}</h4>
                                <button className='removeBtn' onClick={() => onEdit(ind)}>Edit</button>
                                <button className='removeBtn' onClick={() => removeData(ind)}>remove</button>
                            </div>
                        </div>
                    )
                })
            }
            <ToastContainer />
        </div>


    )
}

export default Basicform ;