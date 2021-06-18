import fs from "fs";
import formidable from "formidable";
import { parseJsonToText } from 'utils/parseToText';
import { readXmlFile } from 'utils/readXmlFile';
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

      const text = parseAndSaveTxt(files.file, fields);
      res.status(200).json({success: true, text})
    });   
  }
  catch (error) 
  {
    res.status(200).json({success: false, error: 'La petición no pudo ser procesada, por favor intente de nuevo mas tarde'})  
  }
};

const parseAndSaveTxt = (file, fields) => {
  const data = readXmlFile(file.path)
  return parseJsonToText(data, fields.delimiter, fields.key) 
}

