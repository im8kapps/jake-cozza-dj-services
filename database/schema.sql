-- Supabase Database Schema for Jake Cozza DJ Services
-- This file contains the database schema for storing quote requests

-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_event_date ON quote_requests(event_date);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_quote_requests_updated_at 
    BEFORE UPDATE ON quote_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all data
CREATE POLICY "Service role can manage quote requests" 
    ON quote_requests 
    FOR ALL 
    TO service_role 
    USING (true);

-- Allow authenticated users to read all quote requests (for admin dashboard)
CREATE POLICY "Authenticated users can read quote requests" 
    ON quote_requests 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Allow public to insert quote requests (for contact form)
CREATE POLICY "Anyone can insert quote requests" 
    ON quote_requests 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Create an enum for quote status (optional, for better data consistency)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quote_status') THEN
        CREATE TYPE quote_status AS ENUM ('pending', 'contacted', 'quoted', 'booked', 'completed', 'cancelled');
    END IF;
END $$;

-- Optionally update the table to use the enum (can be done later)
-- ALTER TABLE quote_requests ALTER COLUMN status TYPE quote_status USING status::quote_status;

-- Create a view for dashboard statistics
CREATE OR REPLACE VIEW quote_stats AS
SELECT 
    COUNT(*) as total_requests,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_requests,
    COUNT(*) FILTER (WHERE status = 'booked') as booked_requests,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as requests_last_30_days,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as requests_last_7_days
FROM quote_requests;

-- Grant access to the view
GRANT SELECT ON quote_stats TO authenticated, service_role;