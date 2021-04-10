// -------------------------------------------------------------------------------
// CONEXIÓN DB [provisional]
// -------------------------------------------------------------------------------
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const md5 = require('md5')
const randomstring = require("randomstring");
const { load } = require('cheerio');
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
        return new Promise((res, rej) => { 
                connection.query(`INSERT INTO usuarios (email, pass, secret) VALUES ("${USER.email}","${USER.pass}", "${secret}")`, function (error, results, fields)  {
                        if (error) {
                                const result = {
                                        status: 400,
                                        data: "Usuario ya existe",
                                        ok: false
                                }
                                res(result) 
                        }
                        else {
                                const result = {
                                        status: 200,
                                        data: "Usuario creado",
                                        url: '/signin',
                                        ok: true
                                }
                                res(result)
                        }   
                });
        })
}

const checkUser = (email, pass) => {
        return new Promise((res, rej) => {   
                connection.query(`SELECT secret, id FROM usuarios WHERE email = '${email}' AND pass = '${pass}'`, function(err, results, fields){
                        if (err) {
                                console.log(err);
                                res(false)
                        }
                        else if (results[0]?.secret) {
                                let token = jwt.sign({ email: email, id: results[0].id }, results[0].secret,  {expiresIn: 60*60})
                                const result = {
                                status: 200,
                                data: "Usuario logeado correctamente",
                                token: token,
                                idUsuario: results[0].id,
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

const readFavorite = token => {
        const decode = jwt.decode(token)
        console.log(decode);
        if (decode.email) {
                return new Promise((res, rej) => {
                        connection.query(`SELECT * FROM favoritos WHERE idUsuario = ${decode.id}`, function (error, result, fields)  {
                                if (error) {
                                        console.log(error);
                                        res(false) 
                                }
                                else {
                                        console.log(result);
                                        res(result)
                                }           
                        })
                })
        } else {
                const result = {
                        status: 400,
                        data: "Token not found",
                        url: "/",
                        ok: false
                }
                return result
        }
}

const deleteSecret = token => {
        const secret = randomstring.generate();
        const decode = jwt.decode(token); 
        if(decode.email){
                return new Promise((res, rej) => {
                        connection.query(`UPDATE usuarios SET secret= "${secret}" WHERE email= "${decode.email}"`, function(err, results){
                                if(err) {
                                        const result = {
                                                status : 406,
                                                data: "Algo salió mal...",
                                                ok: false,
                                        };
                                        res(result) 
                
                                } else if (results.changedRows == 1) {
                                        const result = {
                                                status: 200,
                                                data: "Logout correctly",
                                                url : "/",
                                                ok: true
                                        }
                                        res(result) 
                                } else {
                                        const result = {
                                                status: 401,
                                                data: "Algo va mal...",
                                                ok: false
                                        }
                                        res(result)
                                }
                                
                        })
                })
        } else {
                const result = {
                        status: 400,
                        data: "Token not found",
                        url: "/",
                        ok: false
                }
                return result
        }
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

module.exports = {registerNewUser, deleteSecret, deleteFav, checkUser, readFavorite}