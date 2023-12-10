// backend/routes/account.routes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get('/:userId/transactions', accountController.getAccountTransactions);
router.get('/:userId/balance', accountController.getBalance);
router.post('/:userId/deposit', accountController.deposit);
router.post('/:userId/withdrawal', accountController.withdrawal);
router.get('/transactions', accountController.getBankerTransactions);

module.exports = router;
