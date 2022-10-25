const { Router } = require('express');

const { getAllUsuarioVehiculos,
        addUsuarioVehiculo,
        updateVehiculo
} = require('../controllers/consultas');

const router = Router();

router.get('/', getAllUsuarioVehiculos );
router.post('/', addUsuarioVehiculo);
router.post('/updateVehiculo/', updateVehiculo)

module.exports = router;