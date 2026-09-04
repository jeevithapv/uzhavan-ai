import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging

# We will conditionally import Langchain so it doesn't crash if keys are missing during demo
try:
    from langchain_nvidia_ai_endpoints import ChatNVIDIA
    from langchain_groq import ChatGroq
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import PromptTemplate
    from langchain_core.output_parsers import StrOutputParser
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False

router = APIRouter()
logger = logging.getLogger(__name__)

class AskRequest(BaseModel):
    question: str
    language: str = "ta" # Default Tamil

class AskResponse(BaseModel):
    answer: str
    audio_url: str = None

def get_ai_chain(language: str):
    # Base prompt telling the AI how to behave
    prompt = PromptTemplate.from_template(
        "You are Uzhavan AI, an expert agricultural assistant for Indian farmers. "
        "Keep your answers extremely short, simple, and easy to understand. "
        "Do not use complex technical terms. Provide actionable advice. "
        f"Respond ONLY in this language code: {language}.\n\n"
        "Farmer's Question: {question}\n\n"
        "Uzhavan AI:"
    )
    
    # Initialize models
    nvidia_llm = ChatNVIDIA(model="meta/llama3-70b-instruct") if os.getenv("NVIDIA_API_KEY") else None
    groq_llm = ChatGroq(model="llama3-70b-8192") if os.getenv("GROQ_API_KEY") else None
    gemini_llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash") if os.getenv("GEMINI_API_KEY") else None
    
    # Build the fallback chain
    llm = None
    if nvidia_llm:
        llm = nvidia_llm
        if groq_llm: llm = llm.with_fallbacks([groq_llm])
        if gemini_llm: llm = llm.with_fallbacks([gemini_llm])
    elif groq_llm:
        llm = groq_llm
        if gemini_llm: llm = llm.with_fallbacks([gemini_llm])
    elif gemini_llm:
        llm = gemini_llm
        
    if not llm:
        return None
        
    return prompt | llm | StrOutputParser()

@router.post("/ask", response_model=AskResponse)
async def ask_uzhavan(request: AskRequest):
    # Use real AI if available and keys are set
    if LANGCHAIN_AVAILABLE:
        chain = get_ai_chain(request.language)
        if chain:
            try:
                response = await chain.ainvoke({"question": request.question})
                return {"answer": response}
            except Exception as e:
                logger.error(f"AI Provider failed: {str(e)}")
                # If all external APIs fail, fall back to the mock/local logic below
    
    # Final Fallback / Demo Mode (Offline Local Knowledge)
    if "tomato" in request.question.lower() or "தக்காளி" in request.question:
        ans = "Tomato needs NPK fertilizer in the ratio 50:50:50. Ensure adequate irrigation." if request.language == 'en' else "தக்காளிக்கு 50:50:50 விகிதத்தில் NPK உரம் தேவை. போதுமான நீர்ப்பாசனத்தை உறுதிப்படுத்தவும்."
    else:
        ans = "I am Uzhavan AI. How can I help with your farming today?" if request.language == 'en' else "நான் உழவன் AI. இன்று உங்கள் விவசாயத்திற்கு நான் எப்படி உதவ முடியும்?"
        
    return {"answer": ans}
