
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const {signUp, signIn, signOut, getProvinceCode, saveFavorite, searchJobs, validateEmail, validatePass} = require('./src/controllers/controller')

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

app.get("/search/:keyword", async (req, res) => {

    const result = await searchJobs(req.params.keyword);

    res.send(JSON.stringify(result))
})

app.post("/favorites/create", async (req, res) => {
const result = await saveFavorite(req.body.titulo, req.body.resumen, req.body.url, req.body.idUsuario)
// SI el no existe en la base de datos con ese idUsuario = id 
console.log("79", result)
    if(result === 0){
            res.status(400).json({
                status: 400,
                data: "Ese usuario favorito ya existe",
                ok: false,
                
            })
        }
    else {
            res.status(200).json({
                status: 200,
                data: "Usuario favorito guardado correctamente",
                url: '/'
            })
        }
// ELSE
/* 
res.status(500).json({
    status:500,
    data: "Ya existe tu usuario en la base de datos"
    ok: false,
})
*/

})

app.delete("/favorites/delete", async (req, res) => {

    

})

app.get("/favorites/get", async (req, res) => {


    
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))