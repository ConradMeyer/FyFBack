// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const md5 = require('md5')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const {connectDatabase, closeDatabase} = require('../database/crud')
const {registerNewUser, checkUserLogged, checkPassword, generateJWT, deleteSecret} = require('../database/auth')



// -------------------------------------------------------------------------------
// Aux Functions
// -------------------------------------------------------------------------------
function validateEmail(email) {
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return patternEmail.test(email);  
 }
function validatePass(pass) {
    let patternPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return patternPass.test(pass);  
}





// -------------------------------------------------------------------------------
// Logic
// -------------------------------------------------------------------------------

const signUp = async (email, pass) => {
   
    const USER = {
        email: email,
        pass: pass
    }
    registerNewUser(USER)
}

const signIn = async (userName, pass) => {

    // Pending: data validation
    let token, result, secret = md5(Math.random(1, Date.now))
    await checkUserLogged(userName, secret)
        .then(user => checkPassword(pass, user), formatErrorMessage)
        .then(user => generateJWT(user))
        .then(tok => token = tok)
        .catch(err => result = formatErrorMessage(err))
    return !result ? token : result

}

const signOut = async name => {

    // Pending: data validation
    let result
    await deleteSecret(name)
        .then(res => result = res)
        .catch(err => result = formatErrorMessage(err))
    return !result ? formatErrorMessage(result) : "User logged out"

}

const getProvinceCode = location => {

    switch (location) {
        case "madrid": return 263
        case "barcelona": return 240
    }

}

const searchJobs = async (term) => {

    const html = await axios.get(`https://www.tecnoempleo.com/busqueda-empleo.php?te=${term}&ex=,1,2,&pr=#buscador-ofertas`);
    const $ = await cheerio.load(html.data);

    let resumenes = [];
    let titulos = [];
    let urls = [];

    $('a.text-gray-700.font-weight-bold').each(function () {
        titulos.push($(this).text().trim().replace(/\t|\n/g, ""));
    });

    $('span.d-block.fs--15.hidden-md-down.lead.text-gray-800').each(function () {
        resumenes.push($(this).text().trim().replace(/\t|\n/g, ""))
    });

    $('a.text-gray-700.font-weight-bold').each(function () {
        urls.push($(this).attr("href"));
    });

    const result = resumenes.map((el, i) => {
        const obj = {titulo: titulos[i], resumen: el, url: urls[i]}
        return obj
    })
    
    return result;
}


const saveFavorite = name => {

    

}

const formatErrorMessage = err => {

    if (!err) return "User is not in database"
    if (err === "wrong password") return "wrong password"
    if (err.code === 11000) return "User already exist"

}


// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {signUp, signIn, signOut, getProvinceCode, searchJobs, saveFavorite, formatErrorMessage, validateEmail, validatePass}