import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function App() {
  const [count, setCount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/earthquakes/count')
      .then(res => res.json())
      .then(data => setCount(data.earthquake_count))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: '#1a1a2e', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Earthquake Dashboard</h1>
        {error && <p style={{ color: '#ff6b6b' }}>Error: {error}</p>}
        {count !== null && (
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Earthquakes in last 24h: <strong>{count}</strong>
          </p>
        )}
      </header>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  )
}

export default App
