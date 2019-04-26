const fs = require('fs'); //para poder ocupar la libreria,sistema de archivos
const myMarked = require('marked');//renderizar un texto plano a otro como html u otros
const libpath = require("path");//manjear rutas, aquí esta join

//se agrega a files ReadPath
const mdLinks = (path,options) =>{
    return ReadPath(path)
    .then(getlinks)
    .catch(reason=>{console.log("error: " + reason)});
    
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

  //convierte funciones FS a promesas, fuente https://www.frankmitchell.org/2017/06/promise-objects/
const stat=(path)=>{
    return new Promise((resolve) => {
      fs.stat(path, (err, result) => {
        if (err) {
          result = {size: 0, mtime: Date.now()};
        }
        resolve(result);
      });
    });
  }
  function readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  function readDir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  //input: ruta  
//output: array con ruta de archivos MD
const ReadPath= (path)=>{
    let files = stat(path).then((stats)=>{
        if (stats.isDirectory()){
           return (readDir(path))
          .then((files)=>{
             files.filter((file)=>{return getFileExtension3(file)==="md";});
              files=files.map((file)=>{
                return libpath.join(path,file);
              })
              if (files.length<1){throw "elija un archivo o directorio con archivos .md";}
              return files;
          });
         
        } else if (stats.isFile() && getFileExtension3(path)==="md" ){
            let output=[];
            output[0]=path
            return output;
        } else {throw "elija un archivo o directorio valido";}
    });
    return files;    
}  
// input: ruta de archivo .md 
// output: promesa, array de objetos con propiedades Href, Text y File
const getlinks = (files)=>{
    let markdown="";
    let promisesArray=[];
    let links=[]
    files.forEach(file=>{        
      promisesArray.push(readFile(file));
      });
  return Promise.all(promisesArray).then((array)=>{      
    array.forEach((e,i)=>{// recorre array del elemento e indice del array
      markdown=e.toString();    
      links=links.concat(getLinksFromMd(markdown,files[i]));               
    })
    return links;
  });     
  
}


