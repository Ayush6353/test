import { Component } from "react";
import { Space, Table, Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Column } = Table;


class ClassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            formData: {
                Email: "",
                Password: "",
                Age: "",
                Gender: "",
                Chekbox: [],
                value: false,
            },
            editIndex: -1,
            errorMessage: {},
        };

    }

    validationError = () => {
        const { formData } = this.state;
        let patt = /^[A-Za-z1-100._]{4,}[0-9]{0,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
        let passPatt = /^[A-Za-z]{0,}[0-9]{0,}[A-Za-z]{0,}@/;
        const err = {};
        if (formData.Email === "" && formData.Password === "" && formData.Age === "" && formData.Gender === "" && formData.Chekbox.length < 1) {
            toast.error("**enter your Data!", { theme: "colored" });
            err.AllData = "Please enter your email address";
        }
        else if (formData.Email === "") {
            toast.error("**Please enter your email address!", { theme: "colored" });
            err.Email = "Please enter your email address";
        }
        else if (formData.Password === "") {
            toast.error("**Please enter your Password!", { theme: "colored" });
            err.Password = "Please enter your Password";
        }
        else if (formData.Password.length < 6) {
            toast.error("**Please enter your 6 digit Password!", { theme: "colored" });
            err.Password = "Please enter your 6 digit Password";
        }
        else if (!patt.test(formData.Email)) {
            toast.warning("**enter your correct email!", { theme: "colored" });
            err.Email = "enter your correct email!";
        }
        else if (!passPatt.test(formData.Password)) {
            err.Password = "Please enter your correct password!";
            toast.warning("**enter your correct password!", { theme: "colored" });
        }
        else if (formData.Age < 18 || formData.Age === "") {
            toast.error("**Please select your Age!", { theme: "colored" });
            err.Age = "Please select your Age";
        }
        else if (formData.Gender === "") {
            toast.error("**Please select your Gender!", { theme: "colored" });
            err.Gender = "Please select your Gender";
        }
        else if (formData.Chekbox.length < 1) {
            toast.error("**Please select your Tags!", { theme: "colored" });
            err.Chekbox = "Please select your Tags";
        } else {
            toast.success("**success!", { theme: "colored" });
        }
        this.setState({ errorMessage: err });
        return Object.keys(err).length < 1;


    }


    handlSabmit = (e) => {
        e.preventDefault();
        const { formData, editIndex, items, errorMessage } = this.state;
        const newItem = { ...formData };
        const valid = this.validationError();
        console.log(valid, "<========valid========>")
        if (!valid) {
            return false;
        }
        else if (editIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[editIndex] = newItem;
            this.setState({
                items: updatedItems,
                editIndex: -1,
                formData: {
                    Email: "",
                    Password: "",
                    Age: "",
                    Gender: "",
                    Chekbox: [],
                    value: false,
                },
                errorMessage: {}
            });
        } else {
            this.setState((p) => ({

                items: [...p.items, newItem],
                formData: {
                    Email: "",
                    Password: "",
                    Age: "",
                    Gender: "",
                    Chekbox: [],
                    value: false,
                },
                errorMessage: {}
            }));
        }
    }

    editItem = (record, a, i) => {
        console.log(i, "<++=====index");
        const { items } = this.state;
        const itemToEdit = items[i];
        this.setState({
            formData: { ...itemToEdit },
            editIndex: i,
        });
    };

    onDeleteOutlined = (record, a, i) => {
        Modal.confirm({
            title: "are you sure you want to delete",
            onOk: () => {
                console.log(i, "index delate");
                const { items } = this.state;
                const updatedItems = [...items];
                updatedItems.splice(i, 1);
                this.setState({ items: updatedItems });
            }
        })
    };

    handleCheckboxChange = (tag) => {
        const { formData } = this.state;
        const updatedTags = [...formData.Chekbox];
        if (updatedTags.includes(tag)) {
            updatedTags.splice(updatedTags.indexOf(tag), 1);
        } else {
            updatedTags.push(tag);
        }
        this.setState({
            formData: { ...formData, Chekbox: updatedTags },
        });
    };

    render() {
        const { items, formData, errorMessage } = this.state;
        return (
            <div className="main_form">
                <div className="ClassForm">
                    <form className="disply">
                        <div className="row mb-1" >
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" value={formData.Email}
                                    onChange={(e) =>
                                        this.setState({
                                            formData: { ...formData, Email: e.target.value },
                                        })
                                    } />
                            </div>{errorMessage && (
                                <span className="error-message">{errorMessage.Email}</span>
                            )}
                        </div>

                        <div className="row mb-1">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" value={formData.Password}
                                    onChange={(e) =>
                                        this.setState({
                                            formData: { ...formData, Password: e.target.value },
                                        })
                                    } />
                            </div>{errorMessage && (
                                <span className="error-message">{errorMessage.Password}</span>
                            )}
                        </div>

                        <div className="col-2">
                            <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                            <select className="form-select" id="autoSizingSelect" value={formData.Age}
                                onChange={(e) =>
                                    this.setState({
                                        formData: { ...formData, Age: e.target.value },
                                    })
                                } >
                                <option selected>Age...</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={15}>15</option>
                                <option value={8}>8</option>
                            </select>

                        </div>
                        {errorMessage && (
                            <span className="error-message">{errorMessage.Age}</span>
                        )}
                        <fieldset className="row mb-1">
                            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="👨🏻"
                                        checked={formData.Gender === "👨🏻"}
                                        onChange={(e) =>
                                            this.setState({
                                                formData: { ...formData, Gender: e.target.value },
                                            })
                                        } />
                                    <label className="form-check-label" for="gridRadios1">
                                        👨🏻 male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="🧑🏻‍🌾"
                                        checked={formData.Gender === "🧑🏻‍🌾"}
                                        onChange={(e) =>
                                            this.setState({
                                                formData: { ...formData, Gender: e.target.value },
                                            })
                                        } />
                                    <label className="form-check-label" for="gridRadios2">
                                        🧑🏻‍🌾 female
                                    </label>
                                </div>
                            </div>
                            {errorMessage && (
                                <span className="error-message">{errorMessage.Gender}</span>
                            )}
                        </fieldset>

                        <div className="row mb-3">
                            <legend className="col-form-label col-sm-2 pt-0">Chekbox</legend>
                            <div className="col-sm-3 offset-sm-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"
                                        checked={formData.Chekbox?.includes("👍")}
                                        onChange={() => this.handleCheckboxChange("👍")} />
                                    <label className="form-check-label" for="gridCheck1">
                                        👍 tag1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"
                                        checked={formData.Chekbox?.includes("👌")}
                                        onChange={() => this.handleCheckboxChange("👌")} />
                                    <label className="form-check-label" for="gridCheck1">
                                        👌 tag2
                                    </label>
                                </div>
                            </div>{errorMessage && (
                                <span className="error-message">{errorMessage.Chekbox}</span>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handlSabmit}>Sign in</button>
                    </form>
                    {errorMessage && (
                        <span className="error-message">{errorMessage.AllData}</span>
                    )}
                </div>
                <div className="antd">
                    <Table dataSource={items}>
                        <Column title="Email" dataIndex="Email" key="Email" />
                        <Column title="Password" dataIndex="Password" key="Password" />
                        <Column title="Age" dataIndex="Age" key="Age" />
                        <Column title="Gender" dataIndex="Gender" key="Gender" />
                        <Column title="Chekbox" dataIndex="Chekbox" key="Chekbox" />
                        <Column
                            title="ACTION"
                            key="action"
                            render={(record, a, i) => (
                                <Space size="middle">
                                    <Button onClick={() => { this.editItem(record, a, i) }} >Edit</Button>
                                    <Button onClick={() => { this.onDeleteOutlined(record, a, i) }} >Delete</Button>
                                </Space>
                            )}
                        />
                    </Table>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}

export default ClassForm;