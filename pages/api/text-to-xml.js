import fs from "fs";
import formidable from "formidable";
import { parseClientDataToJSON } from 'utils/parseToJson';
import { writeXmlFile } from 'utils/writeXmlFile';
import { empty } from "utils/helpers";

const jwt = require('jsonwebtoken');

export const config = {
  api: {
    bodyParser: false
  }
};

export default (req, res) => {
  switch (req.method) 
  {
    case 'POST': return post(req, res);
    default: return res.status(200).json("HTTPS Method not found")
  }
}

const post = async (req, res) => {
  try 
  {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (error, fields, files) 
    {
      if(error) throw new Error(error)

      const path = files?.file?.name?.split('.')
      const ext = path.pop() || ''
      const fileName = path.shift() || 'temp01'
      
      if(ext !== 'txt')
      {
        res.status(200).json({success: false, error: `El archivo debe ser un .txt`})  
      }

      if(empty(fields.delimiter) || empty(fields.key))
      {
        const field = empty(fields.delimiter) ? 'delimitador' : 'clave de cifrado'
        res.status(200).json({success: false, error: `El campo ${field} es requerido`})  
      }
      
      const {clients, data} = await parseAndSaveXML(files.file, fileName, fields);
      const token = jwt.sign({clientes: clients}, 'prueba');
      
      res.status(200).json({ 
        success: true, 
        clients: {clientes: clients}, 
        txt: data,
        token, 
        fileName: `${fileName}.xml`
      })
    });   
  }
  catch (error) 
  {
    res.status(200).json({success: false, error: 'La petición no pudo ser procesada, por favor intente de nuevo mas tarde'})  
  }
};

const parseAndSaveXML = async (file, fileName, fields) => {
  const data = fs.readFileSync(file.path, 'utf8');
  const clients =  parseClientDataToJSON(data, fields.delimiter, fields.key)
  writeXmlFile(clients, fileName)  
  return {clients , data};
};

