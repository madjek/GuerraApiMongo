module.exports = mongoose => {
    const Independencia = mongoose.model(
      "independencias",
      mongoose.Schema(
        {
          estado: Boolean,
          fecha_inicio: Date,
          fecha_fin: Date,
        },
        { timestamps: true }
      )
    );
  
    return Independencia;
  };