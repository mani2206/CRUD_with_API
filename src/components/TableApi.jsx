import React, { useEffect, useState } from "react";
import { Button, EditableText, InputGroup } from "@blueprintjs/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast.info("Add data successfully!");
const notice = () => toast.warning("Delete data successfully!");
const update = ()=>toast.success('Update data successfully!')
function TableApi() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(searchTerm);

  // const filteredUsers = user.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser([...user, data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
          notify();
        })
    }
  }

  function onChangeHandler(id, key, value) {
    setUser((user) => {
      return user.map((user) => {
        return user.id === id ? { ...user, [key]: value } : user;
      });
    });
  }

  function updateUser(id) {
    const users = user.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        users,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        update();
      });
      
  }

  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((users) => {
          return users.filter((user) => user.id !== id);
        });
        notice();
      });
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-primary ">USER LIST</h2>
        <input
        className="user"
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table container px-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Website</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* search functionality  */}
          {user
            .filter((user) => {
              return searchTerm.toLowerCase() === ""
                ? user
                : user.name.toLowerCase().includes(searchTerm);
            })
            .map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>
                  <EditableText
                    multiline={true}
                    minLines={1}
                    maxLines={6}
                    onChange={(value) =>
                      onChangeHandler(user.id, "email", value)
                    }
                    value={user.email}
                  />
                </td>
                <td>
                  <EditableText
                    multiline={true}
                    minLines={1}
                    maxLines={6}
                    onChange={(value) =>
                      onChangeHandler(user.id, "website", value)
                    }
                    value={user.website}
                  />
                </td>
                <td>
                  <Button
                    className="btn btn-info"
                    onClick={() => updateUser(user.id)}
                  >
                    Update
                  </Button>
                  <Button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                  <ToastContainer />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter Name...."
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Email...."
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter Website...."
              />
            </td>
            <td>
              <Button className="btn btn-success" onClick={addUser}>
                Add User
              </Button>
              <ToastContainer />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default TableApi;
