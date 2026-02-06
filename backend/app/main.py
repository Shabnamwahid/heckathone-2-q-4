from fastapi import FastAPI
from ..db import create_db_and_tables

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Backend is running - Phase 2 Complete"}
