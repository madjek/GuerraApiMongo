const router = require('express').Router();

//Importamos Routes definidas en views
const GuerraRouter = require('./routes/guerra.routes');
const PaisRouter = require('./routes/pais.routes');
const BandoRouter = require('./routes/bando.routes');
const IndependenciaRouter = require('./routes/independencia.routes');
const EstadoRouter = require('./routes/estado.routes');
const ParticipacionRouter = require('./routes/participacion.routes');

//Rutas
router.use('/guerra', GuerraRouter);
router.use('/pais', PaisRouter);
router.use('/bando', BandoRouter);
router.use('/independencia', IndependenciaRouter);
router.use('/estado', EstadoRouter);
router.use('/participacion', ParticipacionRouter);

module.exports = router;