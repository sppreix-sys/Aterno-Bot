process.on('uncaughtException', (err) => {
  console.error('Fatal uncaughtException:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  const errStr = String(reason);
  
  // Если Mineflayer получил таймаут или застрял в ошибке сети
  if (errStr.includes('timed out') || errStr.includes('ETIMEDOUT') || errStr.includes('socketClosed')) {
    console.log('Сбой сети Mineflayer. Перезапуск процесса через 10 секунд...');
    setTimeout(() => process.exit(1), 10000);
  }
});

// === Веб-сервер для Render (защита от сна) ===
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Aternos AFK Bot is running 24/7!');
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
// ===========================================

require('./src');
