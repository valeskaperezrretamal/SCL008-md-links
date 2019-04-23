const fs = require('fs'); //para poder ocupar la libreria,sistema de archivos
const myMarked = require('marked');//renderizar un texto plno a otro como html u otros
const libpath = require("path");//manjear rutas, aquí esta join


const mdLinks = (path,options) =>{
    let files =[];
    let stats = fs.statSync(path);//lee información del archivo

    if (stats.isDirectory()){
        files = fs.readdirSync(path);//guard archivos del dirctorio
        for(let i=0; i<files.length;i++){files[i]=libpath.join(path, files[i]);};//me duvuelve un string,concatena dos rutas, archivo y carpeta, genera la ruta del archivo 
        files=files.filter((file)=>{return getFileExtension3(file)==="md"});//devuelve archivos con extención .md
        
    } else if(stats.isFile() && getFileExtension3(path)==="md"){//ingresa un archivo y debe ser con extención .ms
        files[0]=path;

    }else return console.log("ingresa un archivo .md o un directorio con archivos .md");
    if (files.length<1) return console.log("ingresa un archivo .md o un directorio con archivos .md")
    
    let links=[];
    let markdown="";
    files.forEach(file=>{
         markdown = fs.readFileSync(file).toString(); //lee archivos markdown y los combierte en string
         links= links.concat(getLinksFromMd(markdown,file));
    });
    
    return links;
      
};
module.exports=mdLinks;

// me devuelve array con links 
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


};

// fuente http://www.jstips.co/es_es/javascript/get-file-extension/
function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  };

