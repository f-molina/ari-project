const fs = require('fs')

export const writeTxtFile = (data, fileName) => {
  try 
  {
    fs.writeFileSync(`public/${fileName}.txt`, data);
  } 
  catch (error) 
  {
    console.log(error)
  }
}