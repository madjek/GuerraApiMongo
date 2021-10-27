const express = require('express');
const router = express.Router();

//Importo Controllers
const guerras = require("../controllers/guerra.controller");
  
router.post("/", guerras.create); // Create a new guerra
router.get("/", guerras.findAll); // Retrieve all guerras
router.get("/:id", guerras.findOne); // Retrieve a single guerra with id
router.put("/:id", guerras.update); // Update a guerra with id
router.delete("/:id", guerras.delete); // Delete a guerra with id
router.delete("/", guerras.deleteAll); // Create a new guerra
  

module.exports = router;