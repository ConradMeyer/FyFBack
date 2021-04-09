// -------------------------------------------------------------------------------
// CONEXIÓN DB [provisional]
// -------------------------------------------------------------------------------
const mysql = require('mysql');
const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'fyf'
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