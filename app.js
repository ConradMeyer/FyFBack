
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const {signUp, signIn, signOut, getProvinceCode, saveFavorite, searchJobs, searchJobs2, validateEmail, validatePass} = require('./src/controllers/controller')

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
                data: "Algo va mal...",
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

   

})

app.post("/signout", async (req, res) => {

    

})

app.get("/search/:keyword/:localization", async (req, res) => {
    const result = await searchJobs(req.params.keyword, req.params.localization);  // Cambiar segundo parámetro
    res.send(JSON.stringify(result))
})

// Segundo enpoint de búsqueda de empleo: jooble
app.get("/search2/:localization/:keyword", async (req,res) => {
    const result = await searchJobs2(req.params.localization, req.params.keyword);
    res.send(JSON.stringify(result))

})






app.post("/favorites/create", async (req, res) => {
const result = await saveFavorite(req.body.titulo, req.body.resumen, req.body.url, req.body.idUsuario)
    res.send(result)
})

app.delete("/favorites/delete", async (req, res) => {

    

})

app.get("/favorites/get", async (req, res) => {


    
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))