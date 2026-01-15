import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/earthquakes/count')
      .then(res => res.json())
      .then(data => setCount(data.earthquake_count))
      .catch(err => setError(err.message))
  }, [])

  if (error) return <div>Error: {error}</div>
  if (count === null) return <div>Loading...</div>

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Earthquake Count</h1>
      <p style={{ fontSize: '4rem', fontWeight: 'bold' }}>{count}</p>
    </div>
  )
}

export default App
