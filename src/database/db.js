
// -------------------------------------------------------------------------------
// CONEXIÓN DB [provisional]
// -------------------------------------------------------------------------------
const mysql      = require('mysql');
const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'fyf'
        });

º

// -------------------------------------------------------------------------------
// Logic
// -------------------------------------------------------------------------------


const registerNewUser = (USER) => {
    connection.connect();
    connection.query(`INSERT INTO usuarios (email, pass) VALUES ("${USER.email}","${USER.pass}")`, function (error, results, fields)  {
        // if (error) throw error;

        console.log("res", results)
        console.log("fields", fields)
        console.log("mail", USER.email)
        console.log("pass", USER.pass)

        });
        connection.end();
      // Comparar que no exista mail en DB (lectura)
              // Exite --> res.status(401).json( url:login / ok: false / message: "El usuario ya existe")
              // No existe --> lo añadimos a la DB res.status(200).json( ok: true / message: "Se ha creado el usuario con éxito")

// const result =  signUp(USER.email, USER.pass)
}

const checkPassword = (pass, user) => {



}

const checkUserLogged = (userName, secret) => {


}

const generateJWT = user => {


}

const deleteSecret = user => {

    
}
    






// const registerNewUser = (user, pass) => {

//     const newUser = new users({admin: false, user: user, pass: pass, secret: "", time: 0, score: 0})
//     return newUser.save()

// }
    
// const checkPassword = (pass, user) => {

//     return new Promise((resolve, reject) => {

//         if (!user) reject(user)
//         if (pass !== user.pass) reject("wrong password")
//         resolve(user)

//     })

// }

// const checkUserLogged = (userName, secret) => 
//     users.findOneAndUpdate({user: userName}, {secret: secret}, {new: true})

// const generateJWT = user => 
//     new Promise (resolve => resolve(jwt.sign({user: user.user}, user.secret)))
    
// const deleteSecret = user => 
//     users.findOneAndUpdate({user: user}, {secret: ""}, {new: true})


// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {registerNewUser, checkUserLogged, checkPassword, generateJWT, deleteSecret}