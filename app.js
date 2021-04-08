
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const express = require('express')
const {signUp, signIn, signOut, getProvinceCode, saveFavorite, searchJobs} = require('./src/controllers/controller')
const {connectDatabase} = require("./src/database/crud")

// -------------------------------------------------------------------------------
// Server configuration
// -------------------------------------------------------------------------------

const SERVER_URI = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
const app = express(SERVER_URI)


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