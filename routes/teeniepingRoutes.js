const express = require('express');
const router = express.Router();
const teeniepingController = require('../controllers/teeniepingController');

// 전체 티니핑 리스트 (summary)
router.get('/summary', teeniepingController.getTeeniepingSummary);

// 이름으로 티니핑 검색하기
router.get('/search', teeniepingController.searchTeeniepingByName);

// 특정 티니핑 가져오기
router.get('/:id', teeniepingController.getTeeniepingById);

module.exports = router;
