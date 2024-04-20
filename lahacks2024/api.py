from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

events = [
        {
            "category": "Raiding",
            "description": "We waid",
            "event_name": "Will's Waid Wonderland",
            "event_time": "06:09",
            "location": {
                "lat": 34.071459, 
                "lng":-118.442231
            },
            "post_id": 10
        }
    ]

@app.get("/events")
async def get_event():
    return {"data": events}

@app.post("/events")
async def add_event(event: dict):
    event["post_id"] = uuid.uuid4()
    events.append(event)
    return {"data": {"status": "success", "code": 200, "event": event}}
