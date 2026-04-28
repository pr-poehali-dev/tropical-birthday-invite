CREATE TABLE IF NOT EXISTS t_p43504046_tropical_birthday_in.rsvp_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  answer VARCHAR(10) NOT NULL CHECK (answer IN ('yes', 'no')),
  created_at TIMESTAMP DEFAULT NOW()
);