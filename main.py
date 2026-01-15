from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime
from typing import Optional
from backend.utils import fetch_earthquake_data, count_earthquakes, get_earthquake_locations



app = FastAPI(title="Earthquake Dashboard API")

@app.get("/")
def health_check():
    return {"status": "healthy"}


@app.get("/earthquakes")
async def get_earthquakes():
    """Fetches and returns earthquake data from USGS."""
    data = await fetch_earthquake_data()
    return data

@app.get("/earthquakes/count")
async def get_earthquake_count():
    """Returns the count of earthquakes reported in the last day."""
    count = await count_earthquakes()
    return {"earthquake_count": count}


@app.get("/earthquakes/locations")
async def get_locations():
    """Returns earthquake locations with coordinates and metadata."""
    locations = await get_earthquake_locations()
    return {"locations": locations}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
