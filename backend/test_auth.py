import asyncio
import httpx
import pytest
from uuid import uuid4

# Test constants
BASE_URL = "http://127.0.0.1:8000"
TEST_EMAIL = f"testuser_{str(uuid4())}@example.com"
TEST_PASSWORD = "testpassword123"
TEST_FULL_NAME = "Test User"

@pytest.mark.asyncio
async def test_register_user():
    """Test user registration endpoint"""
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        response = await client.post(
            "/auth/register",
            json={
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD,
                "full_name": TEST_FULL_NAME
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["email"] == TEST_EMAIL
        assert data["full_name"] == TEST_FULL_NAME
        
        print("✓ User registration test passed")
        return data["id"]

@pytest.mark.asyncio
async def test_login_user():
    """Test user login endpoint"""
    # First register a user
    user_id = await test_register_user()
    
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        response = await client.post(
            "/auth/login",
            data={
                "username": TEST_EMAIL,
                "password": TEST_PASSWORD
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["user_id"] == user_id
        assert data["email"] == TEST_EMAIL
        
        print("✓ User login test passed")
        return data["access_token"]

@pytest.mark.asyncio
async def test_get_current_user():
    """Test getting current user with JWT token"""
    # First get a token by logging in
    token = await test_login_user()
    
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        response = await client.get(
            "/auth/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["email"] == TEST_EMAIL
        assert data["full_name"] == TEST_FULL_NAME
        
        print("✓ Get current user test passed")

if __name__ == "__main__":
    # Run tests
    asyncio.run(test_register_user())
    asyncio.run(test_login_user())
    asyncio.run(test_get_current_user())
    print("\n🎉 All authentication tests passed!")