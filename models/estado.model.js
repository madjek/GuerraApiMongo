module.exports = mongoose => {
    const Estado = mongoose.model(
      "estados",
      mongoose.Schema(
        {
          id_pais: Number,
          id_independencia: Number,
        },
        { timestamps: true }
      )
    );
  
    return Estado;
  };