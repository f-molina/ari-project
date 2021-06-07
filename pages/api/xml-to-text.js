var fs = require('fs')
var parser = require('xml2json')

export default (req, res) => {
  if(req.method === 'POST') 
  {
    try 
    {
      const data = fs.readFileSync( 'files/clientes.xml');
      var json = JSON.parse(parser.toJson(data, {
        reversible: true,
        sanitize: true,
        trim: true,
      }));

      const text = parseToTextClientData(json.clientes.cliente, ',') 
      console.log(text)

      res.status(200).json(text)  
    } 
    catch (error) 
    {
      console.log(error)
      res.status(200).json({error: error})  
    }
  }
  else {
    res.status(200).json({ name: 'hola mundo desde get' })
  }
  
}

const parseToTextClientData = (clients, delimiter) => {
  let text = ''

  clients.forEach(client => {
    Object.values(client).forEach((value) => {
      text += `${value.$t}${delimiter}` 
    });
    text += '\n'
  });

  return text
}
