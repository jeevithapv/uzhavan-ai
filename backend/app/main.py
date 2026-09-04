from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.database import engine, Base
from .api import auth, ai, market, disease, weather

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Uzhavan AI Backend",
    description="Backend API for Uzhavan AI Farming Companion and Marketplace",
    version="1.0.0"
)

# CORS Configuration - Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Uzhavan AI API"}

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(market.router, prefix="/api/market", tags=["market"])
app.include_router(disease.router, prefix="/api/disease", tags=["disease"])
app.include_router(weather.router, prefix="/api/weather", tags=["weather"])
