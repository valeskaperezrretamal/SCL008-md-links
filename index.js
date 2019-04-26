#!/usr/bin/env node  
//me avisa que se va a ejecutar con node


//se importa función
let mdLinks= require('./mdLinks.js');
//Acá llamo a la función
mdLinks('./mdsparaPruebas').then(links=>{
  console.log(links);
});

 //forma de llamado
 //console.log(process.argv[2]);
 //console.log(process.argv[3]);




