module.exports = mongoose => {
    const Guerra = mongoose.model(
      "guerras",
      mongoose.Schema(
        {
          nombre: String,
          fecha_inicio: Date,
          fecha_fin: Date,
        },
        { timestamps: true }
      )
    );
  
    return Guerra;
  };