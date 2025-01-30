import express from "express";
import cors from "cors";

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

app.use(cors());
app.use(express.json());

const generateId = () => Math.floor(Math.random() * 1000000).toString();

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};

app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (!result) {
    res.status(404).send("Resource not found.");
  } else {
    res.json(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Missing name or job");
  }
  userToAdd.id = generateId();
  users["users_list"].push(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const success = deleteUserById(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
