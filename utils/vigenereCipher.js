import { encrypt, decrypt } from 'vigenere-cipher'

export const encryptText = (plainText, key) => {
  const value = encrypt(plainText, key)
  console.log(value)
  return value;
}

export const decryptText = (cipherText, key) => {
  return decrypt(cipherText, key);
}