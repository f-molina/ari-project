const fs = require('fs')
const parser = require('xml2json')

export const writeXmlFile = (data) => {
  try 
  {
    const dataToConvert = {
      clientes: {
        cliente: data.map(client => ({
          documento: { $t: client.documento},
          'primer-nombre': { $t: client['primer-nombre']},
          apellido: { $t: client.apellido},
          'credit-card': { $t: client['credit-card']},
          tipo: { $t: client.tipo},
          telefono: { $t: client.telefono}
        }))
      }
    }

    const stringified = JSON.stringify(dataToConvert);
    const xml = parser.toXml(stringified);
    
    fs.writeFileSync('public/newClients.xml', xml);
  } 
  catch (error) 
  {
    console.log(error)
  }
}