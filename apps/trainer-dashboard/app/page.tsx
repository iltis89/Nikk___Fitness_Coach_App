export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>NV Coaching Platform</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>Willkommen beim Trainer Dashboard</p>
      <a 
        href="/dashboard" 
        style={{ 
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1.1rem'
        }}
      >
        Zum Dashboard →
      </a>
    </div>
  );
}
