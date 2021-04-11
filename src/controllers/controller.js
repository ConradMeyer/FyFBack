// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const md5 = require('md5')
const jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const {registerNewUser, checkUser, deleteSecret, deleteFav, readFavorite, registerNewFav, changeCodes} = require('../database/db')

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
        pass: md5(pass)
    }
    const result = await registerNewUser(USER)
    return result
}

const signIn = async (email, pass) => {
    const result = await checkUser(email, md5(pass))
    return result
}

const signOut = async token => {
    const result = await deleteSecret(token);
    return result;
}

const saveFavorite = async (titulo, resumen, url, token) => {
    let decode = jwt.decode(token)
    const NEWFAV = { 
        titulo: titulo, 
        resumen: resumen, 
        url: url, 
        idUsuario: decode.id,
        token: decode
    }
        const result = await registerNewFav(NEWFAV)
        console.log(result, "2");
        return result
}

const readFav = async token => {
    const result = await readFavorite(token);
    return result
}

const deleteFavorite = async (url, token) => {
    let decode = jwt.decode(token)
    if (decode.email) {
        const result = await deleteFav(url);
        return result
    } else {
        const result = {
            status: 400,
            data: "No tienes token, no autorizado",
            ok: false
        }
        return result
    }
}

// Primer scraper
const searchJobs = async (location, key) => {
    const TERM = {
        localizacion: location
    }

    const codigo = await changeCodes(TERM) 
     
    const html = await axios.get(`https://www.tecnoempleo.com/busqueda-empleo.php?te=${key}&pr=,${codigo},&ex=,1,#buscador-ofertas-ini`)
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
        const obj = { titulo: titulos[i], resumen: el, url: urls[i] }
        return obj
    })
    
    return result;
}

// Segundo scraper
const searchJobs2 = async (location, key) => {

    const html = await axios.get(`https://es.jooble.org/SearchResult?rgns=${location}&ukw=${key}&workExp=2`);
    const $ = await cheerio.load(html.data)

    let resumenes = [];
    let titulos = [];
    let urls = [];

    $('span.a7df9').each(function () {
        titulos.push($(this).text().trim().replace(/\t|\n/g, ""));
    });
    $('div._0b1c1').each(function () {
        resumenes.push($(this).text().trim().replace(/\t|\n/g, ""));
    });
    // link = $('a')
    $('a.baa11._1d27a.button_size_M.d95a3._2c371._70395').each(function () {
        urls.push($(this).attr("href").replace(/(m\/)/g, ""));
    });

    const result = resumenes.map((el, i) => {
        const obj = {titulo: titulos[i], resumen: el, url: `es.jooble.org` + urls[i]}
        return obj
    })

    return result;
}

// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {signUp, signIn, signOut, searchJobs, searchJobs2, saveFavorite, validateEmail, validatePass, deleteFavorite, readFav}