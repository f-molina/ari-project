import VigenereCipher from "./vigenereCipher";

export const parseJsonToText = (clients, delimiter, key) => {
  let text = ''

  clients.forEach(client => {

    client = {
      ...client,
      'credit-card': {
        $t: VigenereCipher.decrypt(client['credit-card'].$t, key)
      }
    }

    Object.values(client).forEach((value, index, self) => {
      text += `${value.$t}${index < self.length - 1 ? delimiter: ''}` 
    });

    text += '\n'
  });

  return text
}