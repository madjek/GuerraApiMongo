const express = require('express');
const router = express.Router();

//Importo Controllers
const estados = require("../controllers/estado.controller");
  
router.post("/", estados.create); // Create a new pais
router.get("/", estados.findAll); // Retrieve all estados
router.get("/:id", estados.findOne); // Retrieve a single pais with id
router.put("/:id", estados.update); // Update a pais with id
router.delete("/:id", estados.delete); // Delete a pais with id
router.delete("/", estados.deleteAll); // Create a new pais
  

module.exports = router;