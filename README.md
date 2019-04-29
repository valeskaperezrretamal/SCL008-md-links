# Markdown Links


# **mdLinks.js**
Modulo de utilidad para leer archivos y documentos markdown. Y sea relativos o absolutos.
Para ayudar a detectar archivos ratos. Y así poder ayudar bastante al usuario, a poder facilmente detectar que archivos están en buen estado y cuales no.


# **Installation**
Instala usando npm
 ```sh
$ npm install mdLinks
```

# **Importing**
también lo puedes importar usando require 
```sh
let mdLinks= require('./mdLinks.js');
```

# **Uso** 
mdLinks (path,options); puede aceptar rutas absolutas o relativas.
Acepta archivos o directorios con exteción .md

# **executable**
```sh
md-links <path-to-file> [options]
```

# **Examples**
```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```
