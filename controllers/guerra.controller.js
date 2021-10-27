const db = require("../models");
const Guerra = db.guerras;

const GuerraController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Guerra
GuerraController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Guerra
  const guerra = new Guerra({
    type: req.body.type,
    age: req.body.age
  });

  // Save guerra in the database
  guerra
    .save(guerra)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Guerra."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all guerras from the database.
GuerraController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Guerra.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving guerras."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Guerra with an id
GuerraController.findOne = (req, res) => {
  const id = req.params.id;

  Guerra.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Guerra with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Guerra with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Guerra by the id in the request
GuerraController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Guerra.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Guerra with id=${id}. Maybe Guerra was not found!`
        });
      } else res.send({ message: "Guerra was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Guerra with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Guerra with the specified id in the request
GuerraController.delete = (req, res) => {
  const id = req.params.id;

  Guerra.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Guerra with id=${id}. Maybe Guerra was not found!`
        });
      } else {
        res.send({
          message: "Guerra was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Guerra with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all guerras from the database.
GuerraController.deleteAll = (req, res) => {
    Guerra.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Guerra were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Guerra."
      });
    });
};



module.exports = GuerraController;