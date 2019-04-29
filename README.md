# Markdown Links


## **mdLinks.js**
Libreria para extraer los link de documentos markdown

## **Installation**
Instala usando npm
 ```sh
$ npm install mdLinks
```

## **Importing**
también lo puedes importar usando require 
```sh
let mdLinks= require('./mdLinks.js');
```

## **Uso** 
mdLinks (path,options); puede aceptar rutas absolutas o relativas.
Acepta archivos o directorios con exteción .md

## **Executable**
```sh
md-links <path-to-file> [options]
```

## **Examples**
```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

## **Future versions**

### Options


### `--Validate`

to find out if the link works or not.
output:incluye la palabra ok o fail después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.
```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google 
```
### `--stats`

Output: will be a text with basic statistics about the links.
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

### `--Validate` ### `--stats`

To obtain statistics that need validation results.
```ah
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
