import React from 'react';
import { createRoot } from 'react-dom/client';

// Simple web app component
const WebApp = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8d8a8 0%, #f5f5dc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '20px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#4a5d23',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          🧘 BeCalm
        </h1>
        <h2 style={{
          fontSize: '1.8rem',
          color: '#6b7c32',
          marginBottom: '30px',
          fontWeight: 'normal'
        }}>
          Tu santuario digital de paz y bienestar
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          Versión web en desarrollo. La experiencia completa está disponible en la aplicación móvil.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            backgroundColor: '#a8d8a8',
            padding: '20px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🌱 Meditación</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Encuentra tu paz interior</p>
          </div>
          
          <div style={{
            backgroundColor: '#c4a574',
            padding: '20px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>📖 Diario</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Reflexiona y crece</p>
          </div>
          
          <div style={{
            backgroundColor: '#8fbc8f',
            padding: '20px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>💭 Sabiduría</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Mensajes inspiradores</p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          border: '2px solid #a8d8a8'
        }}>
          <h4 style={{ color: '#4a5d23', margin: '0 0 15px 0' }}>🐳 Docker Ready</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Esta aplicación está lista para ser desplegada usando Docker en tu VPS.
            <br />
            <strong>Puerto:</strong> 8015 | <strong>Nginx:</strong> Configurado
          </p>
        </div>
      </div>
    </div>
  );
};

// Initialize the web app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WebApp />);
