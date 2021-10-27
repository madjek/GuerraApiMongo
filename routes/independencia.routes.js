const express = require('express');
const router = express.Router();

//Importo Controllers
const independencias = require("../controllers/independencia.controller");
  
router.post("/", independencias.create); // Create a new independecia
router.get("/", independencias.findAll); // Retrieve all independencias
router.get("/:id", independencias.findOne); // Retrieve a single independecia with id
router.put("/:id", independencias.update); // Update a independecia with id
router.delete("/:id", independencias.delete); // Delete a independecia with id
router.delete("/", independencias.deleteAll); // Create a new independecia
  

module.exports = router;