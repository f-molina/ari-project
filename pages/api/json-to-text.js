import fs from "fs";
import formidable from "formidable";
import { parseToText } from 'utils/parseToText';
import { empty } from "utils/helpers";
import { writeTxtFile } from "utils/writeTxtFile";

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
      
      if(ext !== 'json')
      {
        res.status(200).json({success: false, error: `El archivo debe ser un .json`})  
      }

      if(empty(fields.delimiter) || empty(fields.key))
      {
        const field = empty(fields.delimiter) ? 'delimitador' : 'clave de cifrado'
        res.status(200).json({success: false, error: `El campo ${field} es requerido`})  
      }

      const{ text, json } = parseAndSaveTxt(files.file, fileName, fields);
      res.status(200).json({success: true, text, json, fileName: `${fileName}.txt` })
    });   
  }
  catch (error) 
  {
    res.status(200).json({success: false, error: 'La petición no pudo ser procesada, por favor intente de nuevo mas tarde'})  
  }
};

const parseAndSaveTxt = (file, fileName, fields) => {
  const json = fs.readFileSync(file.path, 'utf8');
  const clients = JSON.parse(json)
  const text = parseToText(clients.clientes || [], fields.delimiter, fields.key)
  writeTxtFile(text, fileName)
  return { text, json: clients.clientes || [] }
}

