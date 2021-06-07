var fs = require('fs')
var parser = require('xml2json')

export default (req, res) => {
  if(req.method === 'POST') 
  {
    try 
    {
      const data = fs.readFileSync( 'files/clientes.txt', 'utf8');

      const info =  parseToJSONClientData(data, ',')
 
      console.log(info)

      res.status(200).json(info)  
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

const parseToJSONClientData = (data, delimiter) => {
  const clients = data.split('\n')

  const newData = []

  clients.forEach(client => {
    const clientInfo = client.split(delimiter)

    newData.push({
      documento: clientInfo[0],
      "primer-nombre": clientInfo[1],
      apellido: clientInfo[2],
      "credit-card": clientInfo[3],
      tipo: clientInfo[4],
      telefono: clientInfo[5]
    })
  });

  return newData
}
