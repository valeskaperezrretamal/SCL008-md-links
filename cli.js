#!/usr/bin/env node
let mdLinks= require('./mdLinks.js');
let ruta=process.argv[2];

mdLinks(ruta)
.then(console.log)
.catch(console.log);
//Este modulo es para utilizar la función desde consola
// fuente: https://docs.npmjs.com/files/package.json#bin