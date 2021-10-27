const db = require("../models");
const Participacion = db.participaciones;

const ParticipacionController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Participacion
ParticipacionController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Participacion
  const participacion = new Participacion({
    type: req.body.type,
    age: req.body.age
  });

  // Save participacion in the database
  participacion
    .save(participacion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Participacion."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all participaciones from the database.
ParticipacionController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Participacion.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving participaciones."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Participacion with an id
ParticipacionController.findOne = (req, res) => {
  const id = req.params.id;

  Participacion.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Participacion with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Participacion with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Participacion by the id in the request
ParticipacionController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Participacion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Participacion with id=${id}. Maybe Participacion was not found!`
        });
      } else res.send({ message: "Participacion was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Participacion with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Participacion with the specified id in the request
ParticipacionController.delete = (req, res) => {
  const id = req.params.id;

  Participacion.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Participacion with id=${id}. Maybe Participacion was not found!`
        });
      } else {
        res.send({
          message: "Participacion was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Participacion with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all participaciones from the database.
ParticipacionController.deleteAll = (req, res) => {
    Participacion.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Participacion were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Participacion."
      });
    });
};



module.exports = ParticipacionController;