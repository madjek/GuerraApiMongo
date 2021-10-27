module.exports = mongoose => {
    const Bando = mongoose.model(
      "bandos",
      mongoose.Schema(
        {
          nombre: String,
        },
        { timestamps: true }
      )
    );
  
    return Bando;
  };