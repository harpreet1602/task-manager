import React from "react";

import "../assets/css/style.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Swal from 'sweetalert2';

const Home = () => {
  const [itemText, setItemText] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [error, setError] = useState("");
  const [credentials,setCredentials] = useContext(CredentialsContext);
  
  // const [credentials,setCredentials] = useState(null);
  const [token,setToken] = useState(null);
  const [reload, setReload] = useState(false);

  // const url = "http://localhost:5500";

  const url="https://to-do-list-op.herokuapp.com";

  // add new todo item to the database
  const addItem = async (e) => {
    e.preventDefault();

    try {
      if (itemText === "") {
        return;
      }
      const res = await axios.post(
        `${url}/api/item`,
        {
          item: itemText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItemsList((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      setError(err.message);
    }
  };
  // create function to fetch all to do items from the database on refresh so we will use effect here
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user?.token);
    const getAllToDoItems = async () => {
      try {
        console.log(user);
        if (user != null) {
          const res = await axios.get(`${url}/api/items`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          // console.log(res.data);
          console.log("render", res.data);
          if (res.data != null) setItemsList(res.data);
        }
        else {
          return;
        }
    }
      catch (err) {
        setError(err.message);
      }
    };
    
    const getData = async()=>{
      try{
        // const user = JSON.parse(localStorage.getItem("user"));
        // const token = user?.token;
        if(user!=null){
          await fetch(`${url}/getme`,
          { headers: { Authorization: `Bearer ${user.token}` } }
          ).then((res)=>{
            return res.json();
          }).then((data)=>{
            setCredentials(data);
          });
        }
      }
      catch(err){
        console.log(err);
      }
    }
    setReload(true);
    getData();
    getAllToDoItems();
  }, [reload,setCredentials]);

  // delete item when clicked on delete button
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${url}/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newList = itemsList.filter((ele) => {
        return ele._id !== id;
      });
      setItemsList(newList);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update Item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${url}/api/items/${isUpdating}`,
        {
          item: updateItemText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedIndex = itemsList.findIndex((ele) => ele._id === isUpdating);
      itemsList[updatedIndex].item = updateItemText;
      setIsUpdating("");
      setUpdateItemText("");
    } catch (err) {
      setError(err.message);
    }
  };
  // Before updating, we need to show another input box here.
  const renderUpdateForm = () => {
    return (
      <form
        className="update-form"
        onSubmit={(e) => {
          updateItem(e);
        }}
      >
        <input
          className="update-new-input"
          type="text"
          placeholder="New Item"
          onChange={(e) => {
            setUpdateItemText(e.target.value);
          }}
          value={updateItemText}
        />
        <button className="update-new-btn" type="submit">
          Update
        </button>
      </form>
    );
  };

  const updateIdName = (id, name) => {
    setIsUpdating(id);
    setUpdateItemText(name);
  };
  const toggleToDo = async (id, e) => {
    try {
      const updatedIndex = itemsList.findIndex((ele) => ele._id === id);
      itemsList[updatedIndex].checkedVal = !itemsList[updatedIndex].checkedVal;
      await axios.put(`${url}/api/items/${id}`, {
        checkedVal: itemsList[updatedIndex].checkedVal,
      },
      { headers: { Authorization: `Bearer ${token}` } }
      );
      e.target.checked = itemsList[updatedIndex].checkedVal;
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCredentials(null);
  };
  const showAlert = (error)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error
    })
    setError("");
  }
  return (
    <>
      {credentials ? (
        <div className="profile">
          <div className="d-flex justify-content-end mx-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </button>
          </div>
          <div className="welText">Welcome {credentials.name}</div>
          {error !== "" ? 
          // <div className="popMes">{error}</div> 
          showAlert(error)
          :
          <div className="home">
            <h1>ToDo List</h1>
            <form
              className="form"
              onSubmit={(e) => {
                addItem(e);
              }}
            >
              <input
                type="text"
                placeholder="Add ToDo Item"
                onChange={(e) => {
                  setItemText(e.target.value);
                }}
                value={itemText}
              />
              <button type="submit">Add</button>
            </form>
            <div className="todo-listItems">
              {itemsList &&
                itemsList.map((ele, i) => {
                  return (
                    <div className="todo-item" key={i}>
                      {isUpdating === ele._id ? (
                        renderUpdateForm()
                      ) : (
                        <>
                          <p className="item-content">
                            <input
                              type="checkbox"
                              className="checkInp"
                              onChange={(e) => {
                                toggleToDo(ele._id, e);
                              }}
                              checked={ele.checkedVal}
                            />
                            {ele.item}
                          </p>
                          <button
                            className="update-item"
                            onClick={() => {
                              updateIdName(ele._id, ele.item);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="delete-item"
                            onClick={() => {
                              deleteItem(ele._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          }
        </div>
      ) : (
        <div className="unAuthorized">
          <p className="unAuthText">Welcome to 403:</p>
          <h1 className="unAuthHeading">Forbidden resource</h1>
          <p className="unAuthContent">
            The server understood the request but refuses to authorize it.
          </p>
          <p>
            <Link to="/login" className="fw-bold text-body">
              Login here
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
