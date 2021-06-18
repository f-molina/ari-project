const fs = require('fs')
const parser = require('xml2json')

export const readXmlFile = (file) => {
  const data = fs.readFileSync(file, 'utf8');
  
  const json = JSON.parse(parser.toJson(data, {
    reversible: true,
    sanitize: true,
    trim: true,
  }));

  console.log(json.clientes.cliente)

  return json.clientes.cliente
}