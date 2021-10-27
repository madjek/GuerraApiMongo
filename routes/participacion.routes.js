const express = require('express');
const router = express.Router();

//Importo Controllers
const participaciones = require("../controllers/participacion.controller");
  
router.post("/", participaciones.create); // Create a new participacion
router.get("/", participaciones.findAll); // Retrieve all participaciones
router.get("/:id", participaciones.findOne); // Retrieve a single participacion with id
router.put("/:id", participaciones.update); // Update a participacion with id
router.delete("/:id", participaciones.delete); // Delete a participacion with id
router.delete("/", participaciones.deleteAll); // Create a new participacion
  

module.exports = router;