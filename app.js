
// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const {signUp, signIn, signOut, saveFavorite, searchJobs, validateEmail, validatePass, deleteFavorite, readFav} = require('./src/controllers/controller')
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

app.get("/search/:localization/:keyword", async (req,res) => {
    const result = await searchJobs(req.params.localization, req.params.keyword);
    const result2 = await searchJobs2(req.params.localization, req.params.keyword);
    
    const finalResult = [...result, ...result2];

    res.send(finalResult)
  
})

app.post("/favorites/create", async (req, res) => {
    const result = await saveFavorite(req.body.titulo, req.body.resumen, req.body.url, req.body.idUsuario)
    res.send(result)
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