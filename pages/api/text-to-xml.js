import fs from "fs";
import formidable from "formidable";
import { parseClientDataToJSON } from 'utils/parseToJson';
import { writeXmlFile } from 'utils/writeXmlFile';

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
    form.parse(req, async function (error, _, files) 
    {
      if(error) throw new Error(error)

      const clients = await parseAndSaveXML(files.file);
      res.status(200).json({success: true, clients})
    });   
  }
  catch (error) 
  {
    res.status(200).json({success: false, error})  
  }
};

const parseAndSaveXML = async (file) => {
  const data = fs.readFileSync(file.path, 'utf8');
  const clients =  parseClientDataToJSON(data, ',')
  writeXmlFile(clients)  
  return clients;
};

