module.exports = mongoose => {
    const Pais = mongoose.model(
      "paises",
      mongoose.Schema(
        {
          nombre: String,
          id_bando: Number,
        },
        { timestamps: true }
      )
    );
  
    return Pais;
  };