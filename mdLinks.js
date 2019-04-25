const fs = require('fs'); //para poder ocupar la libreria,sistema de archivos
const myMarked = require('marked');//renderizar un texto plano a otro como html u otros
const libpath = require("path");//manjear rutas, aquí esta join

//se agrega a files ReadPath
const mdLinks = (path,options) =>{
    let files= ReadPath(path);
    let links=files.then(getlinks)
    .catch(reason=>{console.log(reason)});
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

}
// fuente http://www.jstips.co/es_es/javascript/get-file-extension/
function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }
//input: ruta  output: array con ruta de archivos MD
const ReadPath= (path)=>{
    let files = stat(path).then((stats)=>{
         if (stats.isDirectory()){
        return Promise.all(readDir(path).filter((file)=>{
            return getFileExtension3(file)==="md";
        })).then((result)=>{
            output=[];
            for(let i=0; i<result.length;i++){output[i]=libpath.join(path, result[i]);}
                if (output.length<1){throw "elija un archivo o directorio con archivos .md";}
            return output;
        });

        } else if (stats.isDirectory() && getFileExtension3(path)==="md" ){
            return [path];
        } else {throw "elija un archivo o directorio valido";}
    });
    return files;    
}  

const getlinks = (files)=>{
    let markdown="";
    files.forEach(file=>{
        markdown = fs.readFileSync(file).toString(); //lee archivos markdown y los combierte en string
        links= links.concat(getLinksFromMd(markdown,file));
    });
}

    
//     let links=[];
//     let markdown="";
//     files.forEach(file=>{
//          markdown = fs.readFileSync(file).toString(); //lee archivos markdown y los combierte en string
//          links= links.concat(getLinksFromMd(markdown,file));
//     });
    
//     return links;
      
// }
//     )};




