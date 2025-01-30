import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    })
    .then((res) => {
      if (res.status !== 201) {
        throw new Error("Failed to create user");
      }
      return res.json();
    });
    return promise;
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.status !== 204) {
        throw new Error("Failed to delete user");
      }
    });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    deleteUser(userToDelete.id)
      .then(() => {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

