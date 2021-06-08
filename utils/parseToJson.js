export const parseClientDataToJSON = (data, delimiter) => {
  const clients = data.split('\n')
  const clientsInfo = []

  clients.forEach(client => {
    const clientInfo = client.split(delimiter)

    clientsInfo.push({
      documento: clientInfo[0],
      "primer-nombre": clientInfo[1],
      apellido: clientInfo[2],
      "credit-card": clientInfo[3],
      tipo: clientInfo[4],
      telefono: clientInfo[5]
    })
  });

  return clientsInfo
}