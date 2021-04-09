
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const express = require('express');
const { json } = require('sequelize');
const {signUp, signIn, signOut, getProvinceCode, saveFavorite, searchJobs, validateEmail, validatePass} = require('./src/controllers/controller')
const {connectDatabase} = require("./src/database/crud")

// -------------------------------------------------------------------------------
// Server configuration
// -------------------------------------------------------------------------------

const SERVER_URI = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
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
         signUp(req.body.email, req.body.pass)
    }else{
        console.log("Te has ido por el ELSE en app.post(signup");
           // Error --> Detectar pass o email
              // Error --> Pass res.status(411).json( ok: false / message : "Su password no cumple con los requisitos que se solicitan" )
              // Error --> Email res.status(406).json( ok: false / message: "Su email no cumple con los requisitos que se solicitan" )


    }
})

app.post("/signin", async (req, res) => {

   

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

    

})

app.get("/favorites/get", async (req, res) => {


    
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

connectDatabase()
app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))