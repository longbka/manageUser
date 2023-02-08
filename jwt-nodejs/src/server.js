require("dotenv").config();
const express = require("express");
const { initWebRoutes } = require("./routes/web.js");
const { initApiRoutes } = require("./routes/api.js");
const { configViewEngine } = require("./config/viewEngine");
const bodyParser = require("body-parser");
const configCors = require("./config/cors");
const cookieParser = require("cookie-parser")
// const { connection } = require("./config/connectionDB.js");
const app = express();
const port = process.env.PORT || 3001;


//config cookie-parser
app.use(cookieParser())

//config view engine
configViewEngine(app);
//config cors
configCors(app)
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers before the routes are defined

//test connection
// connection()


//init web routes
initWebRoutes(app);
initApiRoutes(app);
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
