const db = require("../models");
const Independencia = db.independencias;

const IndependenciaController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Independencia
IndependenciaController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Independencia
  const independencia = new Independencia({
    type: req.body.type,
    age: req.body.age
  });

  // Save independencia in the database
  independencia
    .save(independencia)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Independencia."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all independencias from the database.
IndependenciaController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Independencia.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving independencias."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Independencia with an id
IndependenciaController.findOne = (req, res) => {
  const id = req.params.id;

  Independencia.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Independencia with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Independencia with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Independencia by the id in the request
IndependenciaController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Independencia.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Independencia with id=${id}. Maybe Independencia was not found!`
        });
      } else res.send({ message: "Independencia was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Independencia with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Independencia with the specified id in the request
IndependenciaController.delete = (req, res) => {
  const id = req.params.id;

  Independencia.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Independencia with id=${id}. Maybe Independencia was not found!`
        });
      } else {
        res.send({
          message: "Independencia was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Independencia with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all independencias from the database.
IndependenciaController.deleteAll = (req, res) => {
    Independencia.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Independencia were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Independencia."
      });
    });
};



module.exports = IndependenciaController;