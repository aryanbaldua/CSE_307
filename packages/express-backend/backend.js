import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) => {
return users["users_list"].find((user) => user["id"] === id);
};
const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
      users["users_list"].splice(index, 1);
      return true;
    }
    return false;
};

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
  
app.get("/", (req, res) => {
res.send("Welcome to the Express Backend!");
});

app.get("/users", (req, res) => {
const name = req.query.name;
if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.json(result);
} else {
    res.json(users);
}
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.json(result);
    }
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
  
    if (name !== undefined && job !== undefined) {
      let result = findUsersByNameAndJob(name, job);
      result = { users_list: result };
      res.json(result);
    } else if (name !== undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.json(result);
    } else {
      res.json(users);
    }
});


app.post("/users", (req, res) => {
    console.log(req.body);
    const userToAdd = req.body;
    addUser(userToAdd);
    console.log("Updated users list:", users["users_list"]);
    res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const success = deleteUserById(id);
    if (success) {
      res.status(200).send("User deleted successfully.");
    } else {
      res.status(404).send("Resource not found.");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

