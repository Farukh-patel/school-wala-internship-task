const express = require(express);
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Welcome to Express + MySQL app!');
});

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

export default router;

