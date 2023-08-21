--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM candidates;

--@block
DELETE FROM locations
WHERE locationID = 5;

--@block
USE talentribe;

--@block
ALTER TABLE locations DROP PRIMARY KEY;


--@block
ALTER TABLE locations MODIFY locationID INT AUTO_INCREMENT PRIMARY KEY;

--@block

INSERT INTO candidates (candidateID, name, reviewDate, responsibleAgent, addedBy, reviewStatus, objective, status, currentJob, currentCompany, location, jobType, salaryRange) 
VALUES 
(3,'John Red','2023-08-10',1,2,'Open','Seeking Senior Developer Role','Active','Junior Developer','TechCorp','San Francisco','Full-Time','80,000-90,000 USD'),
(4,'Megan Purple','2023-08-12',1,1,'In Review','Looking for Managerial Roles','Active','Team Lead','BizSolutions','New York','Full-Time','100,000-120,000 USD'),
(5,'Lucas Yellow','2023-08-15',2,1,'Open','Aspiring Data Scientist','Active','Data Analyst','DataWorld','Los Angeles','Part-Time','50,000-60,000 USD');


--@block

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    organisationID INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organisationID) REFERENCES organisations(organisationID)
);
