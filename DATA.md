# USGS Earthquake Data Reference

## API Endpoints

All endpoints return GeoJSON format.

| Timeframe | URL |
|-----------|-----|
| Past Hour | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson` |
| Past Day | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson` |
| Past 7 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson` |
| Past 30 Days | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson` |

You can also filter by minimum magnitude by replacing `all` with the magnitude threshold:

| Filter | URL Pattern |
|--------|-------------|
| Significant only | `significant_day.geojson` |
| Magnitude 4.5+ | `4.5_day.geojson` |
| Magnitude 2.5+ | `2.5_day.geojson` |
| Magnitude 1.0+ | `1.0_day.geojson` |
| All magnitudes | `all_day.geojson` |

## Response Format

```json
{
  "type": "FeatureCollection",
  "metadata": {
    "generated": 1704729600000,
    "url": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
    "title": "USGS All Earthquakes, Past Day",
    "status": 200,
    "api": "1.10.3",
    "count": 142
  },
  "features": [
    {
      "type": "Feature",
      "properties": { ... },
      "geometry": { ... },
      "id": "ci40726231"
    }
  ]
}
```

## Feature Properties

Each earthquake feature has these properties:

| Field | Type | Description |
|-------|------|-------------|
| `mag` | number \| null | Magnitude (can be null for very small quakes) |
| `place` | string | Location description (e.g., "10 km NW of Los Angeles, CA") |
| `time` | number | Unix timestamp in **milliseconds** |
| `updated` | number | Last update timestamp in milliseconds |
| `tz` | number \| null | Timezone offset in minutes |
| `url` | string | Link to USGS event page |
| `detail` | string | Link to detailed GeoJSON for this event |
| `felt` | number \| null | Number of "Did You Feel It?" reports |
| `cdi` | number \| null | Community Decimal Intensity (1-10) |
| `mmi` | number \| null | Modified Mercalli Intensity (1-10) |
| `alert` | string \| null | PAGER alert level: "green", "yellow", "orange", "red" |
| `status` | string | "automatic" or "reviewed" |
| `tsunami` | number | 1 = tsunami warning issued, 0 = no warning |
| `sig` | number | Significance score (0-1000) |
| `net` | string | Network that reported the earthquake |
| `code` | string | Network-specific event code |
| `ids` | string | Comma-separated list of event IDs |
| `sources` | string | Comma-separated list of network sources |
| `types` | string | Comma-separated list of product types |
| `nst` | number \| null | Number of seismic stations used |
| `dmin` | number \| null | Distance to nearest station (degrees) |
| `rms` | number \| null | Root mean square travel time residual |
| `gap` | number \| null | Azimuthal gap (degrees) |
| `magType` | string | Magnitude type (e.g., "ml", "md", "mb", "mw") |
| `type` | string | Event type (usually "earthquake") |
| `title` | string | Title for the event |

## Geometry

```json
{
  "type": "Point",
  "coordinates": [
    -117.1234,  // longitude
    34.5678,    // latitude
    10.5        // depth in km (positive = below surface)
  ]
}
```

**Important:** GeoJSON coordinates are `[longitude, latitude]`, NOT `[latitude, longitude]`!

## Example Feature

```json
{
  "type": "Feature",
  "properties": {
    "mag": 4.2,
    "place": "15 km NNE of Ridgecrest, CA",
    "time": 1704729123456,
    "updated": 1704729500000,
    "tz": null,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40726231",
    "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci40726231.geojson",
    "felt": 127,
    "cdi": 4.1,
    "mmi": 3.8,
    "alert": null,
    "status": "reviewed",
    "tsunami": 0,
    "sig": 271,
    "net": "ci",
    "code": "40726231",
    "ids": ",ci40726231,us7000abc1,",
    "sources": ",ci,us,",
    "types": ",dyfi,focal-mechanism,nearby-cities,origin,phase-data,",
    "nst": 42,
    "dmin": 0.02,
    "rms": 0.18,
    "gap": 35,
    "magType": "ml",
    "type": "earthquake",
    "title": "M 4.2 - 15 km NNE of Ridgecrest, CA"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-117.6543, 35.7890, 8.2]
  },
  "id": "ci40726231"
}
```

## Magnitude Scale Reference

| Magnitude | Classification | Effects |
|-----------|---------------|---------|
| < 2.0 | Micro | Not felt, recorded by instruments |
| 2.0 - 3.9 | Minor | Felt by some, no damage |
| 4.0 - 4.9 | Light | Felt by most, minor damage possible |
| 5.0 - 5.9 | Moderate | Damage to weak structures |
| 6.0 - 6.9 | Strong | Damage in populated areas |
| 7.0 - 7.9 | Major | Serious damage over large areas |
| 8.0+ | Great | Severe damage, widespread destruction |

## Significance Score

The `sig` field (0-1000) is calculated based on:
- Magnitude
- Number of felt reports
- Estimated damage

Higher significance = more notable event. Generally:
- < 100: Minor events
- 100-500: Notable events
- 500+: Significant events
- 1000: Maximum significance

## Useful Tips

1. **Time conversion:** `new Date(feature.properties.time)` gives you a JavaScript Date object
2. **Handle nulls:** Many fields can be null, especially for automatic/unreviewed events
3. **Coordinate order:** Remember it's `[lon, lat, depth]` not `[lat, lon]`
4. **Rate limiting:** USGS doesn't enforce strict rate limits, but be reasonable (don't poll more than once per minute)
5. **Data freshness:** The feeds update approximately every minute

## Additional Resources

- [USGS Earthquake API Documentation](https://earthquake.usgs.gov/fdsnws/event/1/)
- [GeoJSON Specification](https://geojson.org/)
- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/)
