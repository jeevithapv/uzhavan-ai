from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
import random

router = APIRouter()

class DiseaseResponse(BaseModel):
    disease: str
    confidence: float
    symptoms: str
    action: str

@router.post("/analyze", response_model=DiseaseResponse)
def analyze_crop_image(file: UploadFile = File(...)):
    # TODO: Implement YOLO/PyTorch inference here
    # Mocking for Hackathon Demo Mode
    mock_results = [
        {
            "disease": "Tomato Early Blight",
            "confidence": 0.92,
            "symptoms": "Brown spots with concentric rings on lower leaves",
            "action": "Remove infected leaves, apply organic copper fungicide."
        },
        {
            "disease": "Healthy Crop",
            "confidence": 0.98,
            "symptoms": "None",
            "action": "Continue normal care and irrigation."
        }
    ]
    
    return mock_results[0]
