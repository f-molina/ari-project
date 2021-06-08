export const parseJsonToText = (clients, delimiter) => {
  const listSize = clients.lenght - 1  
  let text = ''

  clients.forEach(client => {
    Object.values(client).forEach((value, index) => {
      text += `${value.$t}${index < listSize? delimiter : ''}` 
    });

    text += '\n'
  });

  return text
}