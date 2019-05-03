#!/usr/bin/env node

const fsPromises = require('fs').promises; //para poder ocupar la libreria,sistema de archivos
const myMarked = require('marked');//renderizar un texto plano a otro como html u otros
const libpath = require("path");//manjear rutas, aquí esta join
const fetch = require('node-fetch');

//se agrega a files ReadPath
const mdLinks = (path,options) =>{
    return ReadPath(path)
    .then(getlinks)
    .catch(console.log);    
    };

module.exports=mdLinks;

    // devuelve array con links 
const getLinksFromMd= (markdown,path)=>{
    const renderer = new myMarked.Renderer();
    const output=[];
    renderer.link = (href, title, text)=>{
        output.push({

            href: href,
            text: text,
            file: path
        });
    };
    myMarked(markdown, { renderer: renderer });
    return output;

}
// Devuelve la extención del archivo fuente http://www.jstips.co/es_es/javascript/get-file-extension/
function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  //input: ruta  
//output: array con ruta de archivos MD
const ReadPath= (path)=>{
  return fsPromises.stat(path)
    .then((stats)=>{
        if (stats.isDirectory()){
          return (fsPromises.readdir(path))
          .then((files)=>{
             let filteredfiles=files.filter((file)=>{return getFileExtension3(file)==="md";});
             let mapedFiles=filteredfiles.map((file)=>{
                return libpath.join(path,file);
              });
              if (mapedFiles.length<1){throw "elija un archivo o directorio con archivos .md";}
              return mapedFiles;
          })
         
         
        } else if (stats.isFile() && getFileExtension3(path)==="md" ){
            let output=[];
            output[0]=path
            return output;
        } else {throw "elija un archivo o directorio valido";}
    })
    .catch(reason=>{
      if(reason.code==='ENOENT'){//capturar el error de objeto de node fs.stat
        throw "Error: ingrese una ruta valida";
      }});        
}  
// input: ruta de archivo .md 
// output: promesa, array de objetos con propiedades Href, Text y File
const getlinks = (files)=>{
    
    let markdown="";

    let promisesArray=[];
    let links=[]
    files.forEach(file=>{        
      promisesArray.push(fsPromises.readFile(file));
      
      });

  return Promise.all(promisesArray).then((array)=>{      
    array.forEach((e,i)=>{
      markdown=e.toString();        
      links=links.concat(getLinksFromMd(markdown,files[i]));               
    })
    return links;
  });     
  
}
//input: url a verificar
//output: promesa que se resuelve en un string con info. del enlace
 const checkLink=(urlLink)=>{
   return fetch(urlLink).then(response => {
       return response.ok ? [true,reponse.status] : [false, response.status];      
   });    
 }

 const fillArraytoValidate=(array)=>{
   let promisesArray=[];
   array.forEach(e=>{
     console.log(e.href);
     promisesArray.push(checkLink(e.href));
   });
   return Promise.all(promisesArray)
     .then((verificados)=>{
       let output=[];
       array.forEach((elem,i)=>{
         output.push(elem);
         output[i].ok=verificados[i][0];
         output[i].status=verificados[i][1];
       });
       return output;
     })
    }


