import React, { useState } from 'react';
import './TurkeyMap.css';
import { ReactComponent as TurkeyMapSVG } from '../assets/turkey.svg';

const TurkeyMap = ({ onCityClick }) => {
  
  // Tooltip için State (Farenin konumu ve üzerindeki ilin adı)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: "" });

  // --- 81 İL SÖZLÜĞÜ (Kısaltılmış hali, sen tam listeyi buraya koyacaksın) ---
  // Not: Önceki tam listeni buraya yapıştırmayı unutma! Yer kaplamasın diye kısalttım.
  const ilSozlugu = {
    "adana": { plaka: "01", ad: "Adana" },
    "adiyaman": { plaka: "02", ad: "Adıyaman" },
    "afyonkarahisar": { plaka: "03", ad: "Afyonkarahisar" },
    "afyon": { plaka: "03", ad: "Afyonkarahisar" },
    "agri": { plaka: "04", ad: "Ağrı" },
    "amasya": { plaka: "05", ad: "Amasya" },
    "ankara": { plaka: "06", ad: "Ankara" },
    "antalya": { plaka: "07", ad: "Antalya" },
    "artvin": { plaka: "08", ad: "Artvin" },
    "aydin": { plaka: "09", ad: "Aydın" },
    "balikesir": { plaka: "10", ad: "Balıkesir" },
    "bilecik": { plaka: "11", ad: "Bilecik" },
    "bingol": { plaka: "12", ad: "Bingöl" },
    "bitlis": { plaka: "13", ad: "Bitlis" },
    "bolu": { plaka: "14", ad: "Bolu" },
    "burdur": { plaka: "15", ad: "Burdur" },
    "bursa": { plaka: "16", ad: "Bursa" },
    "canakkale": { plaka: "17", ad: "Çanakkale" },
    "cankiri": { plaka: "18", ad: "Çankırı" },
    "corum": { plaka: "19", ad: "Çorum" },
    "denizli": { plaka: "20", ad: "Denizli" },
    "diyarbakir": { plaka: "21", ad: "Diyarbakır" },
    "edirne": { plaka: "22", ad: "Edirne" },
    "elazig": { plaka: "23", ad: "Elazığ" },
    "erzincan": { plaka: "24", ad: "Erzincan" },
    "erzurum": { plaka: "25", ad: "Erzurum" },
    "eskisehir": { plaka: "26", ad: "Eskişehir" },
    "gaziantep": { plaka: "27", ad: "Gaziantep" },
    "giresun": { plaka: "28", ad: "Giresun" },
    "gumushane": { plaka: "29", ad: "Gümüşhane" },
    "hakkari": { plaka: "30", ad: "Hakkari" },
    "hatay": { plaka: "31", ad: "Hatay" },
    "isparta": { plaka: "32", ad: "Isparta" },
    "mersin": { plaka: "33", ad: "Mersin" },
    "icel": { plaka: "33", ad: "Mersin" },
    "istanbul": { plaka: "34", ad: "İstanbul" },
    "istanbul-avrupa": { plaka: "34", ad: "İstanbul" },
    "istanbul-asya": { plaka: "34", ad: "İstanbul" },
    "izmir": { plaka: "35", ad: "İzmir" },
    "kars": { plaka: "36", ad: "Kars" },
    "kastamonu": { plaka: "37", ad: "Kastamonu" },
    "kayseri": { plaka: "38", ad: "Kayseri" },
    "kirklareli": { plaka: "39", ad: "Kırklareli" },
    "kirsehir": { plaka: "40", ad: "Kırşehir" },
    "kocaeli": { plaka: "41", ad: "Kocaeli" },
    "izmit": { plaka: "41", ad: "Kocaeli" },
    "konya": { plaka: "42", ad: "Konya" },
    "kutahya": { plaka: "43", ad: "Kütahya" },
    "malatya": { plaka: "44", ad: "Malatya" },
    "manisa": { plaka: "45", ad: "Manisa" },
    "kahramanmaras": { plaka: "46", ad: "Kahramanmaraş" },
    "maras": { plaka: "46", ad: "Kahramanmaraş" },
    "mardin": { plaka: "47", ad: "Mardin" },
    "mugla": { plaka: "48", ad: "Muğla" },
    "mus": { plaka: "49", ad: "Muş" },
    "nevsehir": { plaka: "50", ad: "Nevşehir" },
    "nigde": { plaka: "51", ad: "Niğde" },
    "ordu": { plaka: "52", ad: "Ordu" },
    "rize": { plaka: "53", ad: "Rize" },
    "sakarya": { plaka: "54", ad: "Sakarya" },
    "adapazari": { plaka: "54", ad: "Sakarya" },
    "samsun": { plaka: "55", ad: "Samsun" },
    "siirt": { plaka: "56", ad: "Siirt" },
    "sinop": { plaka: "57", ad: "Sinop" },
    "sivas": { plaka: "58", ad: "Sivas" },
    "tekirdag": { plaka: "59", ad: "Tekirdağ" },
    "tokat": { plaka: "60", ad: "Tokat" },
    "trabzon": { plaka: "61", ad: "Trabzon" },
    "tunceli": { plaka: "62", ad: "Tunceli" },
    "sanliurfa": { plaka: "63", ad: "Şanlıurfa" },
    "urfa": { plaka: "63", ad: "Şanlıurfa" },
    "usak": { plaka: "64", ad: "Uşak" },
    "van": { plaka: "65", ad: "Van" },
    "yozgat": { plaka: "66", ad: "Yozgat" },
    "zonguldak": { plaka: "67", ad: "Zonguldak" },
    "aksaray": { plaka: "68", ad: "Aksaray" },
    "bayburt": { plaka: "69", ad: "Bayburt" },
    "karaman": { plaka: "70", ad: "Karaman" },
    "kirikkale": { plaka: "71", ad: "Kırıkkale" },
    "batman": { plaka: "72", ad: "Batman" },
    "sirnak": { plaka: "73", ad: "Şırnak" },
    "bartin": { plaka: "74", ad: "Bartın" },
    "ardahan": { plaka: "75", ad: "Ardahan" },
    "igdir": { plaka: "76", ad: "Iğdır" },
    "yalova": { plaka: "77", ad: "Yalova" },
    "karabuk": { plaka: "78", ad: "Karabük" },
    "kilis": { plaka: "79", ad: "Kilis" },
    "osmaniye": { plaka: "80", ad: "Osmaniye" },
    "duzce": { plaka: "81", ad: "Düzce" }
  };

  // --- FARE HAREKETLERİNİ YAKALA (Tooltip için) ---
  const handleMouseMove = (event) => {
    // Sadece path (il) üzerindeysek tooltip göster
    const target = event.target;
    const parent = target.parentElement;
    const rawId = target.getAttribute('id') || parent?.getAttribute('id');

    if (rawId && rawId !== 'svg-turkey') {
       const svgId = rawId.toLowerCase().trim().replace('tr-', '');
       const sehir = ilSozlugu[svgId];
       
       if (sehir) {
         setTooltip({
           visible: true,
           x: event.clientX, // Farenin ekran X konumu
           y: event.clientY, // Farenin ekran Y konumu
           name: sehir.ad
         });
       } else {
         setTooltip({ ...tooltip, visible: false });
       }
    } else {
       setTooltip({ ...tooltip, visible: false });
    }
  };

  // --- HARİTADAN ÇIKINCA TOOLTIP GİZLE ---
  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // --- TIKLAMA (SEÇME) İŞLEMİ ---
  const handleMapClick = (event) => {
    const target = event.target;
    const parent = target.parentElement;
    const rawId = target.getAttribute('id') || parent?.getAttribute('id');

    if (!rawId || rawId === 'svg-turkey') return;

    const svgId = rawId.toLowerCase().trim().replace('tr-', '');
    const sehirBilgisi = ilSozlugu[svgId];

    if (sehirBilgisi) {
      // 1. Öncekileri temizle
      const harita = document.querySelector('.turkey-svg-map');
      harita.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));

      // 2. Yeniyi Boya
      const secilenPlaka = sehirBilgisi.plaka;

      Object.keys(ilSozlugu).forEach(key => {
        if (ilSozlugu[key].plaka === secilenPlaka) {
          let element = document.getElementById(key);
          if (!element) element = document.getElementById('TR-' + key);
          if (!element) element = document.getElementById(key.toUpperCase());
          if (!element) element = document.getElementById('TR-' + key.toUpperCase());

          if (element) {
            element.classList.add('is-active');
          }
        }
      });

      onCityClick(secilenPlaka, sehirBilgisi.ad);
    }
  };

  return (
    <div className="map-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* TOOLTIP BİLEŞENİ */}
      {tooltip.visible && (
        <div 
          className="custom-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}

      <TurkeyMapSVG 
        className="turkey-svg-map"
        onClick={handleMapClick}
      />
      <div className="map-info">
        <small>*Detaylı bilgi için şehrin üzerine tıklayınız</small>
      </div>
    </div>
  );
};

export default TurkeyMap;