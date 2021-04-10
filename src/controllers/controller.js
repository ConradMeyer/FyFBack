// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const md5 = require('md5')
const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const {registerNewUser, checkUser, deleteSecret, deleteFav, readFavorite} = require('../database/db')



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
    const result = await registerNewUser(USER)
    return result
}

const signIn = async (email, pass) => {
    const result = await checkUser(email, pass)
    return result
}

const signOut = async token => {
    const result = await deleteSecret(token);
    return result;
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

const readFav = async token => {
    const result = await readFavorite(token);
    return result
}

const deleteFavorite = async url => {
    const result = await deleteFav(url);
    return result
}




// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {signUp, signIn, signOut, searchJobs, saveFavorite, validateEmail, validatePass, deleteFavorite, readFav}