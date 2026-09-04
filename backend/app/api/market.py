from fastapi import APIRouter

router = APIRouter()

@router.get("/prices")
def get_market_prices(crop: str = "tomato", location: str = "chennai"):
    # Mock data for Demo
    return {
        "crop": crop,
        "location": location,
        "current_price": 2850,
        "unit": "quintal",
        "previous_price": 2700,
        "trend": "up"
    }
