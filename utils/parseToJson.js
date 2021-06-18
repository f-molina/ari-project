import { empty } from "./helpers";
import VigenereCipher from "./vigenereCipher";

export const parseClientDataToJSON = (data, delimiter, key) => {
  const clients = data.split('\n')
  const clientsInfo = []

  clients.forEach(client => {
    if(empty(client)) return    
    const clientInfo = client.split(delimiter)
    
    clientsInfo.push({
      documento: clientInfo[0],
      "primer-nombre": clientInfo[1],
      apellido: clientInfo[2],
      "credit-card": VigenereCipher.encrypt(clientInfo[3], key),
      tipo: clientInfo[4],
      telefono: clientInfo[5]
    })
  });

  return clientsInfo
}