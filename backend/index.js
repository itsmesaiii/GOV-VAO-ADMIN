const express = require('express');
const app = express();
const { sequelize } = require('./models');

const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const deathRecordRoutes = require('./routes/deathRecordRoutes');

const cors = require('cors');
app.use(cors());


app.use(express.json());

// Routes
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/death-records', deathRecordRoutes);

// Start server
const PORT = 3001;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB Connected');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
