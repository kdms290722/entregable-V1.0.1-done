// inportamos express  `   `

const express = require("express");
const db = require("./utils/database");
const initModels = require("./models/init.model");
const Users = require("./models/users.model");

const app = express();

app.use(express.json())

const PORT = 8000;


db.authenticate()
 .then(() => console.log("Autenticacion exitosa"))
 .catch((error) => console.log(error));

initModels();

db.sync({ force: true })
   .then(() => console.log("base de datos sincronizada"))
   .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Bienvenido al servidor"});
})

app.get("/users", async (req, res) => {
   try{
     const result = await Users.findAll(); //SELECT *from users
     res.status(200).json(result);
   } catch (error) {
   console.log(error);
   }
})

app.get("/users/:id", async (req,res) => {
   try{
   console.log(req.params);
   const {id} =req.params;
   const result = await Users.findByPk(id);
   res.status(200).json(result);
   } catch (error){
  console.log(error)
   }

});

app.get("/users/usersname/:username",async(req,res)=>{
   try{
     const{usersname} = req.params
     const result =await Users.findOne({where: {username}});
     res.status(200).json(result);
   }catch{
    console.log(error)
   }
})

app.post("/users", async(req, res) =>{
   try{
     const user = res.body;
     const result = await Users.create(user)
     res.status(201).json(result);
   } catch{
      res.status(400).json(error.message);
      console.log(error); 
   }
})

app.put("/users/:id", async (req, res) =>{
   try{
      const { id } = req.params;
      const field = req.body;
      const result = await Users.update(field,{
         where:{id},
      });
      res.status(200).json(result);
    } catch{
       res.status(400).json(error.message);
       
    }
})
app.delete("/users/:id", async (req, res) =>{
   try{
      const { id } = req.params;
      const result = await Users.destroy({
         where: {id}
      });
      res.status(200).json(result);
    } catch{
       res.status(400).json(error.message);
       
    }
})

app.listen(PORT, () => {
   console.log(`servidor corriendo en el puerto ${PORT}`);
}); 