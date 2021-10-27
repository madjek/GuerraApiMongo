const db = require("../models");
const Estado = db.estados;

const EstadoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Estado
EstadoController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Estado
  const estado = new Estado({
    type: req.body.type,
    age: req.body.age
  });

  // Save estado in the database
  estado
    .save(estado)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estado."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all estados from the database.
EstadoController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Estado.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving estados."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Estado with an id
EstadoController.findOne = (req, res) => {
  const id = req.params.id;

  Estado.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Estado with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Estado with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Estado by the id in the request
EstadoController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Estado.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Estado with id=${id}. Maybe Estado was not found!`
        });
      } else res.send({ message: "Estado was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Estado with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Estado with the specified id in the request
EstadoController.delete = (req, res) => {
  const id = req.params.id;

  Estado.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Estado with id=${id}. Maybe Estado was not found!`
        });
      } else {
        res.send({
          message: "Estado was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Estado with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all estados from the database.
EstadoController.deleteAll = (req, res) => {
    Estado.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Estado were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Estado."
      });
    });
};



module.exports = EstadoController;