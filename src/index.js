const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const database = require('./database');
const corsConfig = require('./config/cors');
const routes = require('./routes');
const services = require('./services');

const app = express();

dotenv.config();

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api', routes);

database.connect();
services.backups();

app.listen(process.env.PORT || 8100, () => {
  console.log(`Server started at port ${process.env.PORT || 8100}!`);
});
