from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel

import uuid
import dynamodb_connect as ddb

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

test_event_alicia = {
  "post_id": {
    "S": "a763e33b-85e7-48a3-817f-5afa6437b765"
  },
  "user_id": {
    "S": "aliciachuang"
  },
  "category": {
    "S": "Catching"
  },
  "description": {
    "S": "Come catch bellsprout with me! Mostly looking for 3 star shinies or high IV Pokemon. I'm level 42, so all IVs are the same for lvl30+"
  },
  "event_name": {
    "S": "Bellsprout Community Day"
  },
  "event_time": {
    "S": "16:20"
  },
  "location": {
    "M": {
      "lat": {
        "N": "34.071459"
      },
      "lng": {
        "N": "-118.442231"
      }
    }
  }
}

test_event_randy = {
  "post_id": {
    "S": "05b8a9f6-6b5d-4fbf-9d4c-0208fade70c6"
  },
  "user_id": {
    "S": "randyhuynh"
  },
  "category": {
    "S": "Raiding"
  },
  "description": {
    "S": "My brain cells got raided"
  },
  "event_name": {
    "S": "LAHacks"
  },
  "event_time": {
    "S": "09:30"
  },
  "location": {
    "M": {
      "lat": {
        "N": "34.07018536779485"
      },
      "lng": {
        "N": "-118.44674706459047"
      }
    }
  }
}
    
@app.get("/events/")
async def get_event(type: Annotated[list[str] | None, Query()] = None, 
                    category: Annotated[list[str] | None, Query()] = None, 
                    start_time = None, end_time = None, user_id = None):
    if type == None or category == None:
        return {"data": []} # no markers, empty list
    else:
        filter = {"type": type if type != None else [], "category": category if category != None else [],
                  "start_time": start_time, "end_time": end_time, "user_id": user_id}
        filtered_posts = ddb.ddb_get_filtered_posts(filter)
        return {"data": filtered_posts}

@app.get("/events/{post_id}")
async def get_event(post_id):
    return {"data": ddb.ddb_get_post(post_id)}

@app.post("/events/")
async def add_event(event: dict):
    event["post_id"] = str(uuid.uuid4())
    ddb.ddb_update_post(event)
    return {"data": {"status": "success", "code": 200, "event": event}}

@app.get("/users/")
async def get_user(user_id, password):
    raw_info = {'user_id': user_id, 'password': password}
    status = int(ddb.ddb_login_validation(raw_info))
    return {"data": {"status": status}}

@app.post("/users/")
async def add_user(user: dict):
    ddb.ddb_create_account(user)
    return {"data": {"status": "success", "code": 200, "user": user}}

@app.post("/interests/")
async def add_interest(interest: dict):
    ddb.ddb_add_interest(interest)
    return {"data": {"status": "success", "code": 200, "interest": interest}}
