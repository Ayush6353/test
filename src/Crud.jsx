import { Component } from "react";
import { Space, Table } from "antd";
import "../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "1",
          description: "asdf",
          category: "category3",
          status: "active",
          tags: ["tag3", "tag2"],
          value: false,
        },
        {
          title: "2",
          description: "asdf",
          category: "category2",
          status: "inactive",
          tags: ["tag1"],
          value: false,
        },
        {
          title: "3",
          description: "asdf",
          category: "category1",
          status: "inactive",
          tags: ["tag3", "tag1", "tag2"],
          value: false,
        },
        {
          title: "4",
          description: "asdf",
          category: "category2",
          status: "active",
          tags: ["tag3", "tag1"],
          value: false,
        },
      ],
      formData: {
        title: "",
        description: "",
        category: "",
        status: "",
        tags: [],
        value: false,
      },
      errorMessage: {},
      editIndex: -1,
      searchTerm: "",
      dataSource: [],
    };
  }

  validateForm = () => {
    const { formData } = this.state;
    const err = {};
    if (formData.title.trim() === "") {
      err.title = "Please enter a title";
    }
    if (formData.description.trim() === "") {
      err.description = "Please enter a description";
    }
    if (formData.status === "") {
      err.status = "Please select a status";
    }
    if (formData.category === "") {
      err.category = "Please select a category";
    }
    if (formData.tags.length < 1) {
      err.tags = "Please select a tag";
    }
    this.setState({ errorMessage: err });

    return Object.keys(err).length < 1;
    // return false;
  };

  createItem = () => {
    const { formData, editIndex, items } = this.state;
    const isValid = this.validateForm();
    // console.log(isValid);
    if (!isValid) {
      return false;
    }

    const newItem = { ...formData };
    if (editIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      this.setState({
        items: updatedItems,
        editIndex: -1,
        formData: {
          title: "",
          description: "",
          category: "",
          status: "",
          tags: [],
        },
        errorMessage: {},
      });
    } else {
      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        formData: {
          title: "",
          description: "",
          category: "",
          status: "",
          tags: [],
        },
        errorMessage: {},
      }));
    }
  };

  editItem = (i, j, k) => {
    console.log(k, "<++=====index");
    const { items } = this.state;
    const itemToEdit = items[k];
    this.setState({
      formData: { ...itemToEdit },
      editIndex: k,
    });
  };

  deleteItem = (i, j, k) => {
    console.log(k, "index delate");
    const { items } = this.state;
    const updatedItems = [...items];
    updatedItems.splice(k, 1);
    this.setState({ items: updatedItems });
  };

  handleCheckboxChange = (tag) => {
    const { formData } = this.state;
    const updatedTags = [...formData.tags];
    if (updatedTags.includes(tag)) {
      updatedTags.splice(updatedTags.indexOf(tag), 1);
    } else {
      updatedTags.push(tag);
    }
    this.setState({
      formData: { ...formData, tags: updatedTags },
    });
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  // deleted = (record) => {
  //   this.setState({
  //     dataSource: (pre) => {
  //       return pre.filter((student) => student.id !== record.id);
  //     },
  //   });
  // };
  render() {
    const { items, formData, errorMessage, editIndex, searchTerm } = this.state;

    const filteredItems = items.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // let checked = [...check];
    const handleCheckBox = (e, a, b, c) => {
      // console.log(e.target.checked, "checked or not");
      const updatedItems = [...items];
      updatedItems[c] = { ...updatedItems[c], value: e.target.checked };

      this.setState({
        items: updatedItems,
      });
    };
    const deleteChecked = () => {
      // console.log("called");
      const deleteCheck = [...items];
      const todeleteCheck = [...items];
      console.log(deleteCheck, "checkdelete");
      const aaa = [];

      for (let i = 0; i <= todeleteCheck.length; i++) {
        if (todeleteCheck[i]?.value !== true) {
          aaa.push(todeleteCheck[i]);
        }
      }

      // console.log(deleteCheck);

      // console.log(todeleteCheck, "after delete");
      this.setState({ items: aaa });
      // console.log(todeleteCheck, "after delete");
    };

    const columns = [
      {
        title: "Checkbox",
        dataIndex: "check",
        key: "check",
        render: (i, j, k) => {
          return (
            <input
              type="checkbox"
              name=""
              id=""
              checked={items[k].value}
              onChange={(e) => handleCheckBox(e, i, j, k)}
            />
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
      },
      {
        title: "Action",
        key: "action",
        render: (i, j, k) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.editItem(i, j, k);
              }}
            >
              Edit{" "}
            </a>
            <a
              onClick={() => {
                this.deleteItem(i, j, k);
              }}
            >
              Delete
            </a>
          </Space>
        ),
      },
    ];

    return (
      <>
        <h1 style={{ justifyContent: "center", display: "flex" }}>
          CRUD Web Application
        </h1>
        <div className="app">
          <div className="form-container">
            <h2>{editIndex !== -1 ? "Edit Item" : "Create Item"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.createItem();
              }}
            >
              <input
                type="text"
                placeholder="Title"
                className="input-field"
                value={formData.title}
                onChange={(e) =>
                  this.setState({
                    formData: { ...formData, title: e.target.value },
                  })
                }
              />
              {errorMessage && (
                <span className="error-message">{errorMessage.title}</span>
              )}
              <textarea
                placeholder="Description"
                className="input-field"
                value={formData.description}
                onChange={(e) =>
                  this.setState({
                    formData: { ...formData, description: e.target.value },
                  })
                }
              ></textarea>
              {errorMessage && (
                <span className="error-message">
                  {errorMessage.description}
                </span>
              )}
              <div className="input-field">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    this.setState({
                      formData: { ...formData, category: e.target.value },
                    })
                  }
                >
                  <option value="">Select category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </select>
              </div>
              {errorMessage && (
                <span className="error-message">{errorMessage.category}</span>
              )}
              <div className="input-field">
                <p>Status:</p>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={(e) =>
                      this.setState({
                        formData: { ...formData, status: e.target.value },
                      })
                    }
                  />
                  <span className="radio-custom"></span>
                  Active
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={(e) =>
                      this.setState({
                        formData: { ...formData, status: e.target.value },
                      })
                    }
                  />
                  <span className="radio-custom"></span>
                  Inactive
                </label>
              </div>
              {errorMessage && (
                <span className="error-message">{errorMessage.status}</span>
              )}
              <div className="input-field">
                <p>Tags:</p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="tag1"
                    checked={formData.tags?.includes("tag1")}
                    onChange={() => this.handleCheckboxChange("tag1")}
                  />
                  <span className="checkbox-custom"></span>
                  Tag 1
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="tag2"
                    checked={formData.tags?.includes("tag2")}
                    onChange={() => this.handleCheckboxChange("tag2")}
                  />
                  <span className="checkbox-custom"></span>
                  Tag 2
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="tag3"
                    checked={formData.tags?.includes("tag3")}
                    onChange={() => this.handleCheckboxChange("tag3")}
                  />
                  <span className="checkbox-custom"></span>
                  Tag 3
                </label>
              </div>
              {errorMessage && (
                <span className="error-message">{errorMessage.tags}</span>
              )}
              <hr />

              <button type="submit" className="btn">
                {editIndex !== -1 ? "Update" : "Create"}
              </button>
            </form>
          </div>

          <div className="items-container">
            <button onClick={deleteChecked}>delete selected</button>
            <input
              type="text"
              placeholder="Search by Title"
              className="search-input"
              value={searchTerm}
              onChange={this.handleSearch}
            />
            <Table columns={columns} dataSource={filteredItems} />
            {/* <table className="items-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                    <td>{item.tags.join(", ")}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => this.editItem(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => this.deleteItem(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </>
    );
  }
}

export default App;
