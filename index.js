 



//se importa función
let mdLinks= require('./mdLinks.js');
//Acá llamo a la función
mdLinks(process.argv[2]).then(links=>{
  console.log(links);
});

 //forma de llamado
 //console.log(process.argv[2]);
 //console.log(process.argv[3]);



