from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    mobile_number: str
    password: Optional[str] = None
    role: Optional[str] = "farmer"

class FarmerProfileCreate(BaseModel):
    name: Optional[str] = None
    village: Optional[str] = None
    main_crops: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    mobile_number: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
