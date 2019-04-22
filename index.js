#!/usr/bin/env node

//me avisa que se va a ejecutar con node

//module.exports = () => {
  // ...
//};
//ejemplos
//const math = require (' ./src/math');

//console.log(math.add(2,2))
//console.log(math.multiply)
//const fs= require('fs');

//fs.readFile('.src')
//const fs = require('fs');

//fs.readFile('readme.md','utf-8', (err, data) => { 
  //if (err) throw err;
  //console.log(data);

//});

//Acá llamo a la función

let mdLinks= require('./mdLinks.js');

let links = mdLinks('./mdsparaPruebas');

console.log(links);

//process.argv[2] esta es otra forma de poder llamar

//se puede gardar un promesa en una variable
//myPrommiseArray = [];
//PRO TIO  =let myPromise =mdlinks ("asadffd");
//myPromiseArray.push(myPromise);
//...mucho codigo despues...Promise.all(myPromiseArray);
//allPromises.then((allAnsewers)=>{ })

//sumar los elementos de un arreglo de forma recuersiva
//const addNumersInArray = (arr)=>{}
//tarea hacer una función ue retorne un arreglo invertido
//arreglo de string o numeroes invertirlo



