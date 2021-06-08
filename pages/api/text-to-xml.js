import { parseClientDataToJSON } from 'utils/parseToJson';
import { writeXmlFile } from 'utils/writeXmlFile';
const fs = require('fs')

export default (req, res) => {
  if(req.method === 'POST') 
  {
    try 
    {
      const data = fs.readFileSync('files/clientes.txt', 'utf8');
      const clients =  parseClientDataToJSON(data, ',')
      writeXmlFile(clients)
      res.status(200).json({success: true, clients})
    } 
    catch (error) 
    {
      console.log(error)
      res.status(200).json({success: false, error})  
    }
  }
  else {
    res.status(200).json({ name: 'hola mundo desde get' })
  }
}
