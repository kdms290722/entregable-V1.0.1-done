const db = require ("../utils/database");
const Users = require("../models/users.model");
const Todos = require("../models/todos.models")

const users = [
   {username: "kelvinmeneses", email: "kelvinmeneses@gmail.com", password: "1234" },
   {username: "danielmeneses", email: "danielmeneses@gmail.com", password: "1234" },
   {username: "kelibethmeneses", email: "kelibethmeneses@gmail.com", password: "1234" },
];

const todos = [
   {title:"tarea 1" , description:"Description para 1 shalalala" , userId: 1 },
   {title:"tarea 2" , description:"Description para 2 shalalala" , userId: 2 },
   {title:"tarea imposible" , userId: 1 },
   {title:"tarea 1" , description:"Description para  shalalala" , userId: 3 },


];

const categories = [
   {}
];

const todosCategories = [
   {}
];

db.sync({force: true})
   .then(()=> {
      console.log("Iniciando con el sembrario malicioso"); 
      users.forEach((user) => Users.create(user));
      setTimeout(()=> {
          todos.forEach((todo) => Todos.create(todo));
      }, 100);
   })
   .catch((error) => console.log(error))