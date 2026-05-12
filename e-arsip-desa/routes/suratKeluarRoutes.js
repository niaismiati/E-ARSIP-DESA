const express = require('express');
const router = express.Router();
const suratKeluarController = require('../controllers/suratKeluarController');
const { verifyToken, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/generate-nomor', verifyToken, checkRole(['admin', 'operator']), suratKeluarController.generateNomorSurat);
router.get('/', verifyToken, suratKeluarController.getAll);
router.get('/:id', verifyToken, suratKeluarController.getById);
router.post('/', verifyToken, checkRole(['admin', 'operator']), upload.single('lampiran'), suratKeluarController.create);
router.put('/:id', verifyToken, checkRole(['admin', 'operator']), upload.single('lampiran'), suratKeluarController.update);
router.delete('/:id', verifyToken, checkRole(['admin', 'operator']), suratKeluarController.delete);

module.exports = router;

