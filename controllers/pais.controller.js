const db = require("../models");
const Pais = db.paises;

const PaisController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Pais
PaisController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Pais
  const pais = new Pais({
    type: req.body.type,
    age: req.body.age
  });

  // Save pais in the database
  pais
    .save(pais)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pais."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all paises from the database.
PaisController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Pais.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving paises."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Pais with an id
PaisController.findOne = (req, res) => {
  const id = req.params.id;

  Pais.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pais with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pais with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Pais by the id in the request
PaisController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pais.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pais with id=${id}. Maybe Pais was not found!`
        });
      } else res.send({ message: "Pais was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pais with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Pais with the specified id in the request
PaisController.delete = (req, res) => {
  const id = req.params.id;

  Pais.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pais with id=${id}. Maybe Pais was not found!`
        });
      } else {
        res.send({
          message: "Pais was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pais with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all paises from the database.
PaisController.deleteAll = (req, res) => {
    Pais.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pais were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pais."
      });
    });
};



module.exports = PaisController;