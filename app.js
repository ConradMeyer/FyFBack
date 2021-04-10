
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const {signUp, signIn, signOut, getProvinceCode, saveFavorite, searchJobs, validateEmail, validatePass, readFav} = require('./src/controllers/controller')
const {connection} = require('./src/database/db')
// -------------------------------------------------------------------------------
// Server configuration
// -------------------------------------------------------------------------------

 //const SERVER_URI = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
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
    }})

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

    const tk = req.headers.authorization;
        const decodeTK = jwt.decode(tk)
        readFav(decodeTK);

        
        // console.log("req",decodeTK.email);
    
         // Cuando el usuario de al boton de favoritos mostrarselos si los tiene
        // tenemos que recibir un token en el header de la request
        // descifrar el token para poder ver el email(jsonwebtoken) metodo jwt.decode
        //hacer un select a la base de datos a la tabla de usuarios y buscar si existe, si existe recojo su id.
        // Select * from favoritos where idUsuario sea iguial id
                // recibir la consulta del front por el botón favoritos
                // ver cuales tienes guardados en la base de datos
                // los que tengamos guardados se lo devolvemos a front
        // cuando se haga scrapper en la misma función tiene que hacerse una lectura de los favoritos para mostrar en pantalla




        //   const tkDecode = tk.jwt.decode();
        // const options = { 
        //     method: 'POST',
        //     body: JSON.stringify({keyword: KEYWORD.value, ubicacion: UBICACION.value}),
        //     headers:{'Content-Type': 'application/json'}
        //   }
        
    
})


// -------------------------------------------------------------------------------
// Start server
// -------------------------------------------------------------------------------

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))




module.exports = {}