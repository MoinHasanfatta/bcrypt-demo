const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const PORT = 3001

app.get("/",(req,res)=>{
    res.json({message : "Jwt Demo"})
})

app.post("/posts",verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secret',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        } else{
            res.json({
                message : "post created..."
            })
        }
    })
})
app.post("/login",(req,res)=>{
    const user = {
        id : 1,
        user : "jwt-demo",
        email : "demo@jwt.io"
    }
    jwt.sign({user : user},'secret',(err,token)=>{
        res.json({
            token  // usage of token will be in next session (tokens are unique)
        })
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
        
    } else {
        res.sendStatus(403) // forbidden
    }
}
app.listen(PORT,()=>{
    console.log("Json web token")
})

// secret ==   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyIjoiand0LWRlbW8iLCJlbWFpbCI6ImRlbW9Aand0LmlvIn0sImlhdCI6MTc1NjQ0ODMxNX0.MRepN_yd-5Nasm-RmlFCxUthMyrbJHKN4KxzBTK3xhY"
// moin ==  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyIjoiand0LWRlbW8iLCJlbWFpbCI6ImRlbW9Aand0LmlvIn0sImlhdCI6MTc1NjQ0ODYwMn0.hgppPTd66h18tauKVJnXR82BfAjIprz5gWMrGkj0WRs"