from fastapi import HTTPException
import httpx

USGS_EARTHQUAKE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"



async def fetch_earthquake_data() -> dict:
    """
    Fetches earthquake data from the USGS GeoJSON feed.

    Returns:
        Parsed JSON data from the USGS API.

    Raises:
        HTTPException: If the request fails due to network or server errors.
    """
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(USGS_EARTHQUAKE_URL)
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to USGS API timed out")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"USGS API error: {e.response.status_code}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Network error: Unable to reach USGS API")


async def count_earthquakes() -> int:
    """
    Fetches earthquake data and returns the count of earthquakes.

    Returns:
        The number of earthquakes reported in the last day.
    """
    data = await fetch_earthquake_data()
    return len(data.get("features", []))


async def get_earthquake_locations() -> list[dict]:
    """
    Fetches earthquake data and extracts location coordinates with metadata.

    Returns:
        List of earthquakes with id, coordinates (lat, lng), magnitude, place, time, and depth.
    """
    data = await fetch_earthquake_data()
    locations = []

    for feature in data.get("features", []):
        props = feature.get("properties", {})
        geometry = feature.get("geometry", {})
        coords = geometry.get("coordinates", [])

        if len(coords) >= 2:
            locations.append({
                "id": feature.get("id"),
                "lng": coords[0],
                "lat": coords[1],
                "depth": coords[2] if len(coords) > 2 else None,
                "magnitude": props.get("mag"),
                "place": props.get("place"),
                "time": props.get("time"),
            })

    return locations
