import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TurkeyMap from './components/TurkeyMap';
import './App.css';

function MainPage({ adminModu }) {
  const [secilenBaslik, setSecilenBaslik] = useState("");
  const [secilenPlaka, setSecilenPlaka] = useState(null);
  const [subeler, setSubeler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  
  const isAdmin = adminModu; 

  const [yeniSube, setYeniSube] = useState({ ad: "", adres: "", tel: "" });

  const handleSehirSecimi = async (plaka, sehirAdi) => {
    setSecilenBaslik(sehirAdi + " Şubeleri");
    setSecilenPlaka({ kod: plaka, ad: sehirAdi });
    veriCek(plaka);
    
    setTimeout(() => {
        const element = document.getElementById('sube-listesi');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const veriCek = async (plaka) => {
    setYukleniyor(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/subeler/${plaka}`);
      setSubeler(response.data);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setYukleniyor(false);
    }
  };

  const handleEkle = async (e) => {
    e.preventDefault();
    if (!secilenPlaka) return alert("Lütfen önce haritadan bir il seçin!");
    const eklenecekVeri = { ...yeniSube, plaka: secilenPlaka.kod, sehir: secilenPlaka.ad };
    try {
      await axios.post('http://localhost:5000/api/subeler', eklenecekVeri);
      alert("Şube Başarıyla Eklendi!");
      setYeniSube({ ad: "", adres: "", tel: "" });
      veriCek(secilenPlaka.kod);
    } catch (error) { alert("Ekleme başarısız oldu."); }
  };

  const handleSil = async (id) => {
    if(!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subeler/${id}`);
      setSubeler(subeler.filter(s => s.id !== id));
    } catch (error) { alert("Silme işlemi başarısız."); }
  };

  return (
    <div className="app-container">
      <header>
        {/* GENEL BAŞLIK */}
        <h1>Mağaza & Şube Haritası</h1>
        <p>Size en yakın hizmet noktasını bulmak için haritadan bir il seçiniz.</p>
      </header>

      <div className="content">
        <div className="map-area">
          <TurkeyMap onCityClick={handleSehirSecimi} />
        </div>

        <div className="list-area" id="sube-listesi"> 
          
          {/* YÖNETİCİ PANELİ (GİZLİ) */}
          {isAdmin && secilenPlaka && (
            <div className="admin-form">
              <h4>+ Yeni Kayıt Ekle ({secilenPlaka.ad})</h4>
              <form onSubmit={handleEkle}>
                <input type="text" placeholder="Şube/Bayi Adı" value={yeniSube.ad} onChange={e => setYeniSube({...yeniSube, ad: e.target.value})} required />
                <input type="text" placeholder="Adres" value={yeniSube.adres} onChange={e => setYeniSube({...yeniSube, adres: e.target.value})} required />
                <input type="text" placeholder="Telefon" value={yeniSube.tel} onChange={e => setYeniSube({...yeniSube, tel: e.target.value})} required />
                <button type="submit" className="btn save-btn">Kaydet</button>
              </form>
            </div>
          )}

          <h2>{secilenBaslik || "Tüm Hizmet Noktaları"}</h2>
            
          {yukleniyor ? (
            <div className="loading">Yükleniyor...</div>
          ) : subeler.length > 0 ? (
            <ul className="branch-list">
              {subeler.map((sube) => (
                <li key={sube.id} className="branch-item">
                  
                  <div className="card-top">
                      
                      <div className="card-logo-placeholder">
                        🏢
                      </div> 
                      <h3>{sube.ad}</h3>
                  </div>
                  
                  <div className="card-body">
                      <div className="card-info">
                          <span className="info-icon">📍</span>
                          <p>{sube.adres}</p>
                      </div>
                      <div className="card-info">
                          <span className="info-icon">📞</span>
                          <p>
                              <a href={`tel:${sube.tel}`} className="phone-link">{sube.tel}</a>
                          </p>
                      </div>
                  </div>
                  
                  <div className="card-actions">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${sube.ad} ${sube.sehir}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-direction"
                    >
                      🗺️ Yol Tarifi
                    </a>
                    
                    <a href={`tel:${sube.tel}`} className="btn btn-call">Ara</a>

                    {isAdmin && (
                        <button onClick={() => handleSil(sube.id)} className="btn btn-delete">Sil 🗑️</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert">
              {secilenBaslik 
                ? `Bu bölgede (${secilenPlaka?.ad}) henüz kayıtlı noktamız bulunmamaktadır.` 
                : "Harita üzerinden bir bölge seçiniz."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
