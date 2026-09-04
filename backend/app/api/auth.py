from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from ..database.database import get_db
from ..models.user import User, FarmerProfile
from ..schemas.user import UserCreate, UserResponse, Token
from ..auth.utils import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.mobile_number == user.mobile_number).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    hashed_pwd = get_password_hash(user.password) if user.password else None
    
    new_user = User(
        mobile_number=user.mobile_number,
        hashed_password=hashed_pwd,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create empty profile if farmer
    if user.role == "farmer":
        profile = FarmerProfile(user_id=new_user.id)
        db.add(profile)
        db.commit()
        
    return new_user

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mobile_number == form_data.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect mobile number or password")
        
    # For demo, allow empty password login if no password was set (OTP simulation)
    if user.hashed_password and not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect mobile number or password")
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.mobile_number, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
