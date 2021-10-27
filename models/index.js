const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.guerras = require("./guerra.model.js")(mongoose);
db.paises = require("./pais.model.js")(mongoose);
db.bandos = require("./bando.model.js")(mongoose);
db.independencias = require("./independencia.model.js")(mongoose);
db.estados = require("./estado.model.js")(mongoose);
db.participaciones = require("./participacion.model.js")(mongoose);

module.exports = db;