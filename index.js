import express from "express";

const app = express();

app.use((req, res, next) => {
    express.json();
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const port = process.env.PORT || 3333;

class People {
  constructor(id, name, lastName) {
    this._id = id;
    this.name = name;
    this.lastName = lastName;
  }
}

const user1 = new People(1, "Marcos", "Lopes");

const dbApp = {
  userList: [user1],

  getUsers: () => {
    const userList = dbApp.userList;

    return [...userList];
  },

  getUserById: (userId) => {
    const userList = dbApp.getUsers();

    const user = userList.find((user) => user._id === userId);

    return user;
  },
};

app.get("/", (req, res) => {
  res.send("PONG");
});

app.get("/users", (req, res) => {
  return res.send([...dbApp.userList]);
});

app.listen(port, () => {
  console.log("Ouvindo servidor");
});
