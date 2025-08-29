const express = require('express')
const app = express()
const PORT = 3003
const bcrypt = require('bcrypt')

//middleware
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Encryption")
})

const users = []

app.post("/users", async (req,res)=>{
    try {
    const salt = await bcrypt.genSalt()
    const hashedOne = await bcrypt.hash(req.body.password, 10)
    console.log(`The salt is ${salt}`)
    console.log(`The hashed pwd is ${hashedOne}`)

    const user = {name : req.body.name, password : hashedOne}
    users.push(user)
    res.status(201).send("User created Okay")
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/users/login", async (req,res) =>{
    const user = users.find(user => user.name === req.body.name)
    if(user === null){
        return res.status(400)
            .send('cannot find the user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("success")
        } else{
            res.send("not allowed")
        }
    } catch (error){
        res.status(500).send(error)
    }
})
app.listen(PORT,()=>{
    console.log("Welcome to Demo")
})