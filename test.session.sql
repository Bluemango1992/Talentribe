--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM users;

--@block
ALTER TABLE users 
DROP COLUMN email;

--@block
USE talentribe;

--@block
INSERT INTO users (firstName, lastName, email, password)  
VALUES
  ('John', 'Doe', 'john@example.com', 'password1'),
  ('Jane', 'Doe', 'jane@example.com', 'password2'),
  ('Bob', 'Smith', 'bob@example.com', 'password3');