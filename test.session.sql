--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM candidates;

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

--@block

SELECT candidateID, name FROM candidates WHERE name LIKE '%alice%';
