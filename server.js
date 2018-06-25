const express = require("express");
const os = require("os");
const dotenv = require("dotenv").config({ path: "variables.env" });
const logger = require("./logger");
const pjson = require("./package.json");
const invoice_controller = require('./controllers/invoice');
const pdf_controller = require('./controllers/pdf');

const app = express();

const http = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 8111;

const exphbs = require("express3-handlebars");
const hbs = exphbs.create({
  defaultLayout: "default",
  partialsDir: ["views/partials/"],
  extname: ".handlebars"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/invoice/:id" , function(req, res, next){
  pdf_controller(req,res,next);
})
app.get("/html/invoice/:id", function(req, res, next) {
  invoice_controller(req,res)
});

http.listen(port);

logger.info(`${pjson.name} Server Started on http://localhost:${port} >> `);


