import { parseJsonToText } from 'utils/parseToText';
import { readXmlFile } from 'utils/readXmlFile';

export default (req, res) => {
  if(req.method === 'POST') 
  {
    try 
    {
      const data = readXmlFile()
      const text = parseJsonToText(data, ',') 

      res.status(200).json({success: true, text})  
    } 
    catch (error) 
    {
      res.status(200).json({success:false, error})  
    }
  }
  else {
    res.status(200).json({ name: 'hola mundo desde get' })
  }
  
}

