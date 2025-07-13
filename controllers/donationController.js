const Donation = require('../models/Donation'); // Assuming you have a Donation model

const createDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, items } = req.body;

    // Create and save the donation to the database
    const donation = new Donation({ donorName, donorEmail, items });
    await donation.save();

    // Send a success response
    res.status(200).json({ message: 'Donation successful.' });
  } catch (error) {
    console.error('Donation Error:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { createDonation };
