// -------------------------------------------------------------------------------
// CONEXIÓN DB [provisional]
// -------------------------------------------------------------------------------
const mysql = require('mysql');
const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'fyfdb'
});
connection.connect();

// -------------------------------------------------------------------------------
// Logic
// -------------------------------------------------------------------------------

const registerNewUser = (USER) => {
        connection.query(`INSERT INTO usuarios (email, pass) VALUES ("${USER.email}","${USER.pass}")`, function (error, results, fields)  {
                if (error) {
                        return false
                }
                else {
                        return true;
                }   
        });
}

const checkPassword = (pass, user) => {



}

const checkUserLogged = (userName, secret) => {


}

const generateJWT = user => {


}

const deleteSecret = user => {

    
}
    


function readFavorite(email) {

        //hacer un select a la base de datos a la tabla de usuarios y buscar si existe, si existe recojo su id.
        connection.query(`SELECT id FROM usuarios WHERE email  ("${email}")`, function (error, id, fields)  {
           
            console.log();
        //     console.log(fields);
        // connection.query(`SELECT * from favoritos INNER JOIN usuarios ON 'favoritos.idUsuarios' = 'usuarios.id'`), function (error, id, fields)  {
    
             if (error) {
    
                     return false
             }
            else {
                     return true;
             }           
             
}

        
        )};

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

module.exports = {registerNewUser, checkUserLogged, checkPassword, generateJWT, deleteSecret, readFavorite, connection}