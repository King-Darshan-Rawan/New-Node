// console.log("succesfully initialized")

const fs = require("fs");
const http = require("http");
const url = require("url");
const express = require("express")

const app = express();

app.get('/' , (req,res) =>{
    return res.send("Hello from Home page")
})
app.get('/about' , (req,res) =>{
    return res.send("Hello from About page")
})

const MyHandler = (req, res) => {
    if (req.url === "/favicon.ico") {
      return res.end();
    }
    const log = `${Date()} ${req.url} new Request Recieved \n`;
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    fs.appendFile("log.text", log, (err, data) => {
      res.end("Hello From Server");
      if (err) {
        console.log("Error Loading:", err);
      }
    });
    // console.log("Hai");
    // res.end("Hello Guys on My new Server");
    // console.log(req.headers)
    // console.log("...........",req.url)
    switch (myUrl.pathname) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        res.end("I am Rawan");
        break;
      case "/creator":
        res.end("AhamBramhasmi");
        break;
      case "/sing-up":
        if (req.method === "GET") {
          res.end("This Is a Singup Form");
        } else if (req.method === "POST") {
          res.end("This is a Singup Form");
        }
      default:
        res.end("Wave in 404 Not Found");
        break;
    }
  };
  
  
  const MyNewServer = http.createServer(MyHandler);
  MyNewServer.listen(8050, () => {
    console.log("testing Server Started");
  })
