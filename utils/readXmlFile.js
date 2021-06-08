const fs = require('fs')
const parser = require('xml2json')

export const readXmlFile = () => {
  const data = fs.readFileSync( 'files/clientes.xml');
  
  const json = JSON.parse(parser.toJson(data, {
    reversible: true,
    sanitize: true,
    trim: true,
  }));

  return json.clientes.cliente
}