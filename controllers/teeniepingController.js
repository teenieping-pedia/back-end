const Teenieping = require('../models/teeniepingModel');

// 전체 티니핑 리스트 (summary)
exports.getTeeniepingSummary = async (req, res) => {
  try {
    const teeniepings = await Teenieping.find({}, '_id name imageUrl series rank');
    res.json(teeniepings);
  } catch (error) {
    console.error('티니핑 리스트 조회 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 특정 티니핑 가져오기 (id)
exports.getTeeniepingById = async (req, res) => {
  try {
    const teenieping = await Teenieping.findById(req.params.id);
    if (teenieping) {
      res.json(teenieping);
    } else {
      res.status(404).send('Teenieping not found');
    }
  } catch (error) {
    console.error('티니핑 조회 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 이름으로 티니핑 검색하기
exports.searchTeeniepingByName = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: '검색할 이름을 입력하세요.' });
    }

    const teeniepings = await Teenieping.find({
      name: { $regex: q, $options: 'i' }
    }, '_id name imageUrl series rank');

    res.json(teeniepings);
  } catch (error) {
    console.error('이름으로 티니핑 검색 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};
