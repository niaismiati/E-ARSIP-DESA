const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/auth');

router.get('/stats', verifyToken, dashboardController.getStats);
router.get('/chart', verifyToken, dashboardController.getChartData);
router.get('/recent-letters', verifyToken, dashboardController.getRecentLetters);
router.get('/pending-disposisi', verifyToken, dashboardController.getPendingDisposisi);
router.get('/klasifikasi-summary', verifyToken, dashboardController.getKlasifikasiSummary);
router.get('/aktivitas', verifyToken, dashboardController.getAktivitas);

module.exports = router;

