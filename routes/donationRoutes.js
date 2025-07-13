const express = require('express');
const { createDonation } = require('../controllers/donationController');

const router = express.Router();

// Existing donation route
router.post('/donate', createDonation);

// ✅ NEW: Signup form page route
router.get('/signup', (req, res) => {
  res.render('admin/signup'); // this will look for views/admin/signup.ejs
});

// ✅ NEW: Signup form submission route
router.post('/signup', (req, res) => {
  const { name, email, location } = req.body;
  console.log('Signup received:', { name, email, location });

  // You can store this in a DB later. For now just respond
  res.send('Thank you for signing up!');
});

module.exports = router;
