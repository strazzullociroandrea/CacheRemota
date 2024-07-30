const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const middleware = require("./middleware.js");
const codici = [];
const fs = require("fs");
const conf = JSON.parse(fs.readFileSync("./conf.json"));
(()=>{
    try{
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
            extended: true,
            })
        );
        middleware(app, codici);
        const server = http.createServer(app);
        server.listen(conf.port, () => {
          console.log("---> server running on port "+conf.port);
        });
    }catch(e){
        console.log(e);
    }
    
})();