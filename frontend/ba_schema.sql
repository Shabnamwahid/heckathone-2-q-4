-- Better Auth Database Schema
-- This SQL creates the necessary tables for Better Auth with PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS ba_users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE IF NOT EXISTS ba_accounts (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ba_users(id) ON DELETE CASCADE,
    account_type VARCHAR(255) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at BIGINT,
    scope TEXT,
    id_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE IF NOT EXISTS ba_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ba_users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    idle_timeout BIGINT,
    absolute_timeout BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Verification table
CREATE TABLE IF NOT EXISTS ba_verification (
    id VARCHAR(255) PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- JWKS table for JWT key management
CREATE TABLE IF NOT EXISTS ba_jwks (
    id VARCHAR(255) PRIMARY KEY,
    key_type VARCHAR(255) NOT NULL,
    key_value TEXT NOT NULL,
    algorithm VARCHAR(255) NOT NULL,
    use VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ba_users_email ON ba_users(email);
CREATE INDEX IF NOT EXISTS idx_ba_accounts_user_id ON ba_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_ba_sessions_user_id ON ba_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ba_verification_identifier ON ba_verification(identifier);