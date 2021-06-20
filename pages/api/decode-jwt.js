import { empty } from "utils/helpers";
const jwtDecoder = require('jsonwebtoken');

export default (req, res) => {
  switch (req.method) 
  {
    case 'POST': return post(req, res);
    default: return res.status(200).json("HTTPS Method not found")
  }
}

const post = (req, res) => {
  try 
  {
    const { jwt, key } = req.body
    
    if(empty(jwt) || empty(key))
    {
      const field = empty(jwt) ? 'jwt' : 'clave de cifrado'
      res.status(200).json({success: false, error: `El campo ${field} es requerido`})  
    }

    const json = jwtDecoder.verify(jwt, key);
    res.status(200).json({ success: true, json: json.clientes })
  } 
  catch (error) 
  {
    res.status(200).json({success: false, error: 'La petición no pudo ser procesada, por favor intente de nuevo mas tarde'})  
  }
}