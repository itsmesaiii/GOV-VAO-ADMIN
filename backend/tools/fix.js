// tools/fixDeathRecordPaths.js
const { DeathRecord, sequelize } = require('../models');
const path = require('path');

async function fixPaths() {
  const records = await DeathRecord.findAll();

  for (const record of records) {
    const fileName = path.basename(record.proofFilePath);
    if (fileName !== record.proofFilePath) {
      console.log(`Fixing: ${record.proofFilePath} → ${fileName}`);
      record.proofFilePath = fileName;
      await record.save();
    }
  }

  console.log('✅ Finished updating death records');
  process.exit();
}

fixPaths();
