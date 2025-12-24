import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const girisYap = (e) => {
    e.preventDefault();
    // YENİ ŞİFRE: admin123
    if (sifre === "admin123") { 
      navigate('/panel', { state: { yetkili: true } });
    } else {
      alert("Hatalı Şifre!");
    }
  };

  return (
    <div className="app-container" style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background:'#f1f2f6'}}>
      <div className="admin-form" style={{maxWidth: '400px', width: '100%', margin:0, borderLeft:'none', borderTop:'5px solid #e74c3c'}}>
        <h2 style={{textAlign:'center', color:'#2c3e50', marginTop:0}}>Yönetim Paneli</h2>
        <p style={{textAlign:'center', color:'#7f8c8d', marginBottom:'30px'}}>Lütfen giriş yapınız.</p>
        
        <form onSubmit={girisYap}>
            <input 
                type="password" 
                placeholder="Şifre" 
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
            />
            <button type="submit" className="btn save-btn" style={{background:'#e74c3c'}}>Giriş Yap</button>
        </form>
        
        <p style={{textAlign:'center', marginTop:'20px'}}>
            <a href="/" style={{color:'#95a5a6', textDecoration:'none', fontSize:'0.9rem'}}>← Siteye Geri Dön</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;