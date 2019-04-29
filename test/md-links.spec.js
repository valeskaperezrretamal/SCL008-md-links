const mdLinks = require('../mdLinks.js');

//resultados esperados
const resultadoCarpetaTest= [ { href: 'https://es.wikipedia.org/wiki/JavaScript',
text: 'enlace a wikipedia funcionando, para archivo numero 1,J.S',
file: 'mdsparaPruebas\\archivo1.md' },
{ href: 'https://este.enlace.es.muy.bueno/pero/esta.roto',
text: 'enlace roto 1, archivo numero 1',
file: 'mdsparaPruebas\\archivo1.md' },
{ href: 'https://enlace.roto/no.funciona',
text: 'enlace roto 1.1, archivo numero 1',
file: 'mdsparaPruebas\\archivo1.md' },
{ href: 'htpps://enlace/supermalo/porque/esta.roto',
text: 'enlace roto, archivo numero 2',
file: 'mdsparaPruebas\\archivo2.md' },
{ href: 'https://www.google.com',
text:
 'enlace  fucncionado, para la prueba del archivo numero 2,google',
file: 'mdsparaPruebas\\archivo2.md' },
{ href:
 'https://www.civico.com/santiago/evento?date=finalizacion&category=todas',
text:
 'enlace 1 funcionado, para la prueba del archivo numero 3,panoarmas',
file: 'mdsparaPruebas\\archivo3.md' },
{ href: 'https://enlace.malito/este.enlace/no.esta.funcionando',
text: 'enlace roto, archivo numero 3',
file: 'mdsparaPruebas\\archivo3.md' },
{ href: 'https://www.ubereats.com/es-CL/',
text:
 'enlace 1.1 funcionando,para la puerba del archivo numero 3,uberEats',
file: 'mdsparaPruebas\\archivo3.md' },
{ href: 'https://www.netflix.com/cl/',
text:
 'enlace 1.2 funcionando, para la prueba del archivo numero 3,netflix ',
file: 'mdsparaPruebas\\archivo3.md' },
{ href: 'https://www.google.com&quot;',
text: 'https://www.google.com&quot;',
file: 'mdsparaPruebas\\ejemploPromesas.js' } ]
 
describe('test mdLinks', () => {
    //Así se testea algo con promesas
    test('Debería ser capaz de leer el directorio del programadeberia retornar un array de objetos que contenga href,text y file', () => {
        expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
        return mdLinks('./mdsparaPruebas')
            .then((result) => {
                expect(result).toEqual(resultadoCarpetaTest);
            }).catch((error) => {

            });
    });
    test('Debería retornar un mensaje de error, en caso de ruta inexistente', () => {
      
      return expect(mdLinks('./noexiste')).rejects.toThrow('Error: ingrese una ruta valida');

          
  });



  });

