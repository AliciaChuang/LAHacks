from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/events/")
async def get_event(post_id = None):
    if post_id:
        ddb_key = {"post_id": {"S": post_id}}
        return {"data": ddb.ddb_get(ddb_key, "PogoPosts")}
    return {"data": []}

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
