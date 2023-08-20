--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM notes;

--@block
USE talentribe;

--@block
ALTER TABLE locations DROP PRIMARY KEY;


--@block
ALTER TABLE locations MODIFY locationID INT AUTO_INCREMENT PRIMARY KEY;

--@block
INSERT INTO locations (organisationID, officeType, address, city, state, country, postalCode) VALUES
(1, 'Head Office', '123 Tech Street', 'Silicon Valley', 'CA', 'USA', '94025'),
(1, 'Branch Office', '456 Tech Avenue', 'San Francisco', 'CA', 'USA', '94105'),
(2, 'Head Office', '789 Finance Blvd', 'London', 'Greater London', 'UK', 'E1W 3TJ'),
(2, 'Branch Office', '101 Fin Street', 'Edinburgh', 'Lothian', 'UK', 'EH1 3TY');

--@block

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    organisationID INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organisationID) REFERENCES organisations(organisationID)
);
