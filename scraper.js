const axios = require('axios');
const cheerio = require('cheerio');
// const { Server } = require('node:http');
const express = require('express');

// const Counter = require('./data/models/Counter.js');
// const Poem = require('./data/models/Poem.js');

// ------ Configuración inicial ------
const server = express();
const listenPort = process.env.PORT || 8080;

// HAY QUE APUNTAR AL FRONT ("/Public")
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Levantar el Servidor
server.listen(listenPort,
    () => console.log(`Server listening on ${listenPort}`)
);

// WEBSCRAPPER
async function webscraper() {

    const html = await axios.get(`https://www.tecnoempleo.com/busqueda-empleo.php?te=java&pr=#buscador-ofertas`);
    const $ = await cheerio.load(html.data);
    // console.log(html.data);

    let titulos = [];
    let resumenes = [];

    $('h5.h6-xs.pl-3.pr-1.pt-2').each(function () {
        titulos.push($(this).text().trim());
    });

    $('span.d-block.fs--15.hidden-md-down.lead.text-gray-800').each(function () {
        resumenes.push($(this).text().trim())
    });

    console.log(titulos);
    
}
    

webscraper()