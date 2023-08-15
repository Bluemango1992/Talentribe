--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM responsibilities;

--@block
USE talentribe;

--@block

SELECT * FROM candidates WHERE candidateID = 1;

--@block

INSERT IGNORE INTO candidates (candidateID, name, reviewDate, responsibleAgent, addedBy, reviewStatus, objective, status, currentJob, currentCompany, location, jobType, salaryRange)
VALUES (1, 'Alice Green', '2023-08-05', 1, 1, 'Open', 'Looking for a challenging position in XYZ industry.', 'Active', 'Software Developer', 'TechCorp Ltd.', 'New York, NY', 'Full Time', '$70,000 - $90,000');

--@block
DELETE TABLES candidates;
