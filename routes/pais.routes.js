const express = require('express');
const router = express.Router();

//Importo Controllers
const paises = require("../controllers/pais.controller");
  
router.post("/", paises.create); // Create a new pais
router.get("/", paises.findAll); // Retrieve all paises
router.get("/:id", paises.findOne); // Retrieve a single pais with id
router.put("/:id", paises.update); // Update a pais with id
router.delete("/:id", paises.delete); // Delete a pais with id
router.delete("/", paises.deleteAll); // Create a new pais
  

module.exports = router;