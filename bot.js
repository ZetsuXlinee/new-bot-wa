const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = 'wBfRCqKhR98W7vTVwNXy'; // Token Kizz udah aku ganti

// Webhook buat Fonnte
app.post('/webhook', async (req, res) => {
  const data = req.body;
  const nomor = data.sender;
  const pesan = data.message?.text?.toLowerCase().trim() || '';

  console.log(`Chat dari ${nomor}: ${pesan}`);

  if(pesan.includes('menu') || pesan == 'hai' || pesan == 'pulsa') {
    fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        target: nomor,
        message: `*KONTER KIZZ* 🔥\n\nTelkomsel 10rb = 10.500\nTelkomsel 20rb = 20.400\nXL 25rb = 25.500\nData 3GB = 30.000\nKalo udah bayar ketik: UDAH BAYAR`
      })
    });
  }
  else if(pesan == 'udah bayar') {
    fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        target: nomor,
        message: `Siap Bos ✅ Kizz cek dulu transferannya ya. Tunggu 1-3 menit.`
      })
    });
  }

  res.send('ok');
});

app.get('/', (req, res) => res.send('Bot Kizz UDAH JALAN 🔥'));
app.get('/webhook', (req, res) => res.send('Bot Kizz UDAH JALAN 🔥'));

export default app;
