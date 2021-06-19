const fs = require('fs')
const parser = require('xml2json')

export const writeTxtFile = (data, fileName) => {
  try 
  {
    console.log(data)
    fs.writeFileSync(`public/${fileName}.txt`, data);
  } 
  catch (error) 
  {
    console.log(error)
  }
}