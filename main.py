from fastapi import FastAPI, Query, HTTPException
import httpx
from datetime import datetime
from typing import Optional
from backend.fetch_earthquakes import fetch_earthquake_data



app = FastAPI(title="Earthquake Dashboard API")

@app.get("/")
def health_check():
    return {"status": "healthy"}


@app.get("/earthquakes")
async def get_earthquakes():
    """Fetches and returns earthquake data from USGS."""
    data = await fetch_earthquake_data()
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
