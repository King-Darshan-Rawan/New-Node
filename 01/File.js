const fs = require("fs");
//sync....
// fs.writeFileSync('./test.text', 'Hey There')
//Async....
// fs.writeFile('./test.text', 'Hey There Async', err =>{} )
const result = fs.readFile("./test.text", "utf-8")
console.log(result)