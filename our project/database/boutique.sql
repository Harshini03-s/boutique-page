USE shalu_boutique;

-- Create a users table for storing user account information
CREATE TABLE people (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert a sample user
INSERT INTO people (first_name, last_name, email, password, phone)
VALUES ('ananth', 'bairavi', 'ananthelago76@gmail.com', 'hashed_password', '1234567890');
SELECT * FROM people;

---------------------------------------------------------------------------------------------------------------------------------
-- Create a contact_messages table for storing contact form submissions
CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert a sample contact message
INSERT INTO contactmessages (name, email, message)
VALUES ('ananth', 'ananthuelango76@gmail.com', 'I would like more information about your boutique.');
SELECT * FROM messages;

--------------------------------------------------------------------------------------------------------------------------------------------
-- Create an orders table (if users can place orders) for user order information
-- Create a wishlist table to allow users to add items to their wishlist
CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_name VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Insert a sample wishlist item
INSERT INTO wishlist (user_id, item_name)
VALUES (1, 'Red Dress');
SELECT * FROM wishlist;

-- Create a settings table to store user preferences and notification settings
CREATE TABLE user_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Insert sample user settings
INSERT INTO user_settings (user_id, email_notifications, sms_notifications)
VALUES (1, true, false);
SELECT * FROM user_settings;
