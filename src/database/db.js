// -------------------------------------------------------------------------------
// CONEXIÓN DB [provisional]
// -------------------------------------------------------------------------------
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
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
        const secret = randomstring.generate();
        connection.query(`INSERT INTO usuarios (email, pass, secret) VALUES ("${USER.email}","${USER.pass}", "${secret}")`, function (error, results, fields)  {
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

const checkUser = (email, pass) => {
        return new Promise((res, rej) => {        
                connection.query(`SELECT secret FROM usuarios WHERE email = '${email}' AND pass = '${pass}'`, function(err, results, fields){
                        if (err) {
                                console.log(err);
                                rej(false)
                        }
                        else if (results[0]?.secret) {
                                let token = jwt.sign({ email: email }, results[0].secret, {expiresIn: 60*60})
                                const result = {
                                status: 200,
                                data: "Usuario creado correctamente",
                                token: token,
                                url: "/home",
                                ok: true
                                }
                                res(result) 
                        }
                        else if(results[0] == undefined) {
                                const result = {
                                        status: 401,
                                        data: "Email o contraseña incorrect@s",
                                        ok: false,
                                        
                                }
                                res(result) 
                        }
                })
        })
}

const deleteSecret = user => {

    
}

const deleteFav = async url => {
        return new Promise ((res, rej) => {
                connection.query(`DELETE FROM favoritos WHERE url = "${url}"`, function (error, results) {
                        if (error) {
                                res(false) 
                        }
                        else {
                                res(true) ;
                        } 
                });
        })
}
    

// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {registerNewUser, deleteSecret, deleteFav, checkUser}