
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const {signUp, signIn, signOut, saveFavorite, searchJobs, validateEmail, validatePass, deleteFavorite} = require('./src/controllers/controller')

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
        const result =  signUp(req.body.email, req.body.pass)
        if (result) {
            res.status(200).json({
                status: 200,
                data: "Usuario creado",
                url: '/signin',
            })
        }
        else {
            res.status(400).json({
                status: 400,
                data: "Algo va mal...(Usuario ya existe)",
                ok: false,
            })
        }
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

app.post("/signout", async (req, res) => {

    

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


    
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))