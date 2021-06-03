import express from "express";

const app = express();

app.use((req, res, next) => {
  express.json();
  res.header("Access-Control-Allow-Origin", "*");
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

class Expenses {
  constructor(crew, airNavigation, fuel, maintence) {
    this.crew = crew;
    this.airNavigation = airNavigation;
    this.fuel = fuel;
    this.maintence = maintence;
  }
}

const user1 = new People(1, "Jonathan", "Lopes");
user1.expense = new Expenses(100, 200, 1, 1);


const user2 = new People(2, "Marcos", "Maia");



console.log(user1);
const dbApp = {
  userList: [user1, user2],
  expenseList: [],
};

app.get("/", (req, res) => {
  res.send("PONG");
});

app.get("/users", (req, res) => {
  return res.send([...dbApp.userList]);
});

app.get("/user/:id", (req, res) => {
  const userList = dbApp.userList;

  const { id } = req.params;

  const user = userList.find((user) => user._id == id);

  res.send(user);
});

app.listen(port, () => {
  console.log("Ouvindo servidor");
});
