
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const {signUp, signIn, signOut, saveFavorite, searchJobs, validateEmail, validatePass, deleteFavorite, readFav} = require('./src/controllers/controller')

// -------------------------------------------------------------------------------
// Server configuration
// -------------------------------------------------------------------------------

// const SERVER_URI = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
const app = express();

// -------------------------------------------------------------------------------
// Frontend app
// -------------------------------------------------------------------------------

const staticFilesPath = express.static(__dirname + "/public")
app.use(staticFilesPath)
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// -------------------------------------------------------------------------------
// API
// -------------------------------------------------------------------------------

app.post("/signup", async (req, res) => {
    if(validateEmail(req.body.email)&&validatePass(req.body.pass)){
        const result =  await signUp(req.body.email, req.body.pass)
        res.send(result)
    } else {
        res.status(406).json({
            status: 406,
            data: "Usuario/contraseña no valida",
            ok: false
        })
    } 
})

app.post("/signin", async (req, res) => {
    const result = await signIn(req.body.email, req.body.pass)
    res.send(result)
})

app.put("/signout", async (req, res) => {
    const result = await signOut(req.headers.authorization);
    res.send(result);
})

app.get("/search/:keyword", async (req, res) => {
    const result = await searchJobs(req.params.keyword);
    res.send(JSON.stringify(result))
})

app.post("/favorites/create", async (req, res) => {
    
})

app.delete("/favorites/delete", async (req, res) => {
    const result = await deleteFavorite(req.body.url);
    res.send(result)
})

app.get("/favorites/get", async (req, res) => {
    const result = await readFav(req.headers.authorization);
    res.send(result)
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))