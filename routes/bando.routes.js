const express = require('express');
const router = express.Router();

//Importo Controllers
const bandos = require("../controllers/bando.controller");
  
router.post("/", bandos.create); // Create a new bando
router.get("/", bandos.findAll); // Retrieve all bandos
router.get("/:id", bandos.findOne); // Retrieve a single bando with id
router.put("/:id", bandos.update); // Update a bando with id
router.delete("/:id", bandos.delete); // Delete a bando with id
router.delete("/", bandos.deleteAll); // Create a new bando
  

module.exports = router;