from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_weather(lat: float, lon: float):
    # TODO: Connect to OpenWeatherMap or similar
    # Mock data for Demo Mode
    return {
        "current": {
            "temp": 32,
            "condition": "Sunny",
            "humidity": 68,
            "rain_prob": 20
        },
        "forecast": [
            {"time": "Morning", "temp": 28, "icon": "☀️"},
            {"time": "Afternoon", "temp": 34, "icon": "☀️"},
            {"time": "Evening", "temp": 30, "icon": "🌤️"}
        ],
        "alerts": [
            {"type": "Heat", "message": "High temperature expected this afternoon."}
        ]
    }
