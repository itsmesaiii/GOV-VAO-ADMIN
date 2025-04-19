// backend/index.js

const express = require('express');
const app = express();
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');

const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const deathRecordRoutes = require('./routes/deathRecordRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/death-records', deathRecordRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Serve uploads with forced download and correct PDF headers
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
      // Always serve as PDF attachment
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${path.basename(filePath)}"`
      );
    },
  })
);

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
