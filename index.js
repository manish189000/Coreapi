require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Schema and Model
const valueSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Value = mongoose.model('Value', valueSchema);

// Routes
app.get('/values', async (req, res) => {
  const values = await Value.find();
  res.json(values);
});

app.post('/values', async (req, res) => {
  const { values } = req.body;
  await Value.deleteMany(); // Clear existing values
  await Value.insertMany(values); // Insert new values
  res.json({ message: 'Values updated successfully' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
