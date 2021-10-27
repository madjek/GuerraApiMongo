const db = require("../models");
const Bando = db.bandos;

const BandoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Bando
BandoController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Bando
  const bando = new Bando({
    type: req.body.type,
    age: req.body.age
  });

  // Save bando in the database
  bando
    .save(bando)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bando."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all bandos from the database.
BandoController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Bando.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bandos."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Bando with an id
BandoController.findOne = (req, res) => {
  const id = req.params.id;

  Bando.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Bando with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Bando with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Bando by the id in the request
BandoController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Bando.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Bando with id=${id}. Maybe Bando was not found!`
        });
      } else res.send({ message: "Bando was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Bando with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Bando with the specified id in the request
BandoController.delete = (req, res) => {
  const id = req.params.id;

  Bando.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Bando with id=${id}. Maybe Bando was not found!`
        });
      } else {
        res.send({
          message: "Bando was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bando with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all bandos from the database.
BandoController.deleteAll = (req, res) => {
    Bando.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Bando were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Bando."
      });
    });
};



module.exports = BandoController;