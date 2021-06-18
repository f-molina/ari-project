import fs from "fs";
import formidable from "formidable";
import { parseClientDataToJSON } from 'utils/parseToJson';
import { writeXmlFile } from 'utils/writeXmlFile';
import { empty } from "utils/helpers";

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
      if(empty(fields.delimiter) || empty(fields.key))
      {
        const field = empty(fields.delimiter) ? 'delimitador' : 'clave de cifrado'
        res.status(200).json({success: false, error: `El campo ${field} es requerido`})  
      }
      
      if(error) throw new Error(error)

      const clients = await parseAndSaveXML(files.file, fields);
      res.status(200).json({success: true, clients})
    });   
  }
  catch (error) 
  {
    res.status(200).json({success: false, error: 'La petición no pudo ser procesada, por favor intente de nuevo mas tarde'})  
  }
};

const parseAndSaveXML = async (file, fields) => {
  const data = fs.readFileSync(file.path, 'utf8');
  const clients =  parseClientDataToJSON(data, fields.delimiter, fields.key)
  writeXmlFile(clients)  
  return clients;
};

