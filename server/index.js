const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- SANAL VERİTABANI (Örnek Veriler) ---
let subeler = [
    { id: 1, plaka: "34", sehir: "İstanbul", ad: "Merkez Mağaza", adres: "Büyükdere Cad. No:100 Levent", tel: "0212 555 10 10" },
    { id: 2, plaka: "34", sehir: "İstanbul", ad: "Kadıköy Bölge Bayii", adres: "Bağdat Cad. No:20 Kadıköy", tel: "0216 555 20 20" },
    { id: 3, plaka: "06", sehir: "Ankara", ad: "Ankara Lojistik Merkezi", adres: "Turan Güneş Bulvarı No:50 Çankaya", tel: "0312 444 06 06" },
    { id: 4, plaka: "35", sehir: "İzmir", ad: "Ege Bölge Müdürlüğü", adres: "Alsancak Kordon Boyu No:10", tel: "0232 333 35 35" },
];

// 1. Şehre göre şubeleri getir
app.get('/api/subeler/:plaka', (req, res) => {
    const plakaKodu = req.params.plaka;
    const sonuc = subeler.filter(sube => sube.plaka === plakaKodu);
    res.json(sonuc);
});

// 2. Yeni şube ekle
app.post('/api/subeler', (req, res) => {
    const yeniSube = req.body;
    yeniSube.id = Date.now(); // Rastgele ID
    subeler.push(yeniSube);
    console.log("Yeni şube eklendi:", yeniSube.ad);
    res.status(201).json(yeniSube);
});

// 3. Şube sil
app.delete('/api/subeler/:id', (req, res) => {
    const id = parseInt(req.params.id);
    subeler = subeler.filter(sube => sube.id !== id);
    res.json({ message: "Silindi" });
});

app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});