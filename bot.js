const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = 'CPatS4LP9fkmJheuiipx8HqRoHfHjwcaPv4RvS'; // Token Kizz udah aku colok

// Fungsi kirim WA via Fonnte
async function kirimWA(nomor, pesan) {
  try {
    await axios.post('https://api.fonnte.com/send', {
      target: nomor,
      message: pesan
    }, {
      headers: { 'Authorization': TOKEN }
    });
  } catch(e) {
    console.log('Gagal kirim:', e.response.data);
  }
}

// Webhook dari Fonnte - ini otaknya bot
app.post('/webhook', async (req, res) => {
  const data = req.body;
  const nomor = data.sender; // nomor buyer
  const pesan = data.message?.text?.toLowerCase() || '';

  console.log(`Chat masuk dari ${nomor}: ${pesan}`);

  // Kalo buyer ngetik "menu" / "pulsa" / "hai"
  if(pesan.includes('pulsa') || pesan.includes('menu') || pesan == 'hai') {
    kirimWA(nomor, `*SELAMAT DATANG DI KONTER KIZZ* 🔥\n\n*DAFTAR HARGA PULSA:*\nTelkomsel 10rb = Rp10.500\nTelkomsel 20rb = Rp20.400\nTelkomsel 50rb = Rp50.300\nXL 25rb = Rp25.500\n*Cara Pesan:*\n1. Transfer ke QRIS/OVO/DANA Kizz\n2. Kirim bukti + nomor tujuan\n3. Ketik: UDAH BAYAR\nKizz proses manual ya Bos 🙏`);
  }
  
  // Kalo buyer ngetik "UDAH BAYAR"
  else if(pesan == 'udah bayar') {
    kirimWA(nomor, `Siap Bos, Kizz cek dulu transferannya ✅\nTunggu 1-3 menit ya.\n\nKalo udah Kizz isi manual pake aplikasi konter. Nanti Kizz kirim notif "BERHASIL" ke sini.`);
  }
  
  // Kalo buyer ngetik lain-lain
  else {
    kirimWA(nomor, `Halo Bos 👋 Ketik "menu" buat liat harga pulsa ya.`);
  }

  res.sendStatus(200);
});

// Biar tau bot jalan
app.get('/', (req, res) => {
  res.send('Bot Kizz Manual UDAH JALAN 🔥');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot Kizz jalan di port ${PORT}`));