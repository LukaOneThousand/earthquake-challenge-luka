import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function App() {
  const [count, setCount] = useState(null)
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/earthquakes/count')
      .then(res => res.json())
      .then(data => setCount(data.earthquake_count))
      .catch(err => setError(err.message))

    fetch('/earthquakes/locations')
      .then(res => res.json())
      .then(data => setLocations(data.locations))
      .catch(err => setError(err.message))
  }, [])

  const getMarkerColor = (magnitude) => {
    if (magnitude >= 6) return '#ff0000'
    if (magnitude >= 4) return '#ff6600'
    if (magnitude >= 2) return '#ffcc00'
    return '#00cc00'
  }

  const getMarkerRadius = (magnitude) => {
    if (!magnitude) return 3
    return Math.max(3, magnitude * 2)
  }

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
          {locations.map((eq) => (
            <CircleMarker
              key={eq.id}
              center={[eq.lat, eq.lng]}
              radius={getMarkerRadius(eq.magnitude)}
              fillColor={getMarkerColor(eq.magnitude)}
              color={getMarkerColor(eq.magnitude)}
              fillOpacity={0.7}
              weight={1}
            >
              <Popup>
                <strong>Magnitude: {eq.magnitude ?? 'N/A'}</strong><br />
                {eq.place}<br />
                Depth: {eq.depth ? `${eq.depth} km` : 'N/A'}<br />
                {eq.time && new Date(eq.time).toLocaleString()}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default App
