export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Vercel Deployment Test</h1>
      <p>If you can see this, the deployment is working!</p>
      <p>Build time: {new Date().toISOString()}</p>
      <a href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Dashboard
      </a>
    </div>
  );
}