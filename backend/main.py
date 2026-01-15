from fastapi import FastAPI, Query

from datetime import datetime
from typing import Optional

app = FastAPI(title="Earthquake Dashboard API")

@app.get("/")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
