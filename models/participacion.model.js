module.exports = mongoose => {
    const Participacion = mongoose.model(
      "participaciones",
      mongoose.Schema(
        {
          id_guerra: Number,
          id_bando: Number,
        },
        { timestamps: true }
      )
    );
  
    return Participacion;
  };