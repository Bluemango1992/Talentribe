--@block
SHOW DATABASES;

--@block
SHOW TABLES;

--@block
SELECT * FROM candidates;

--@block
USE talentribe;

--@block

CREATE TABLE organisations (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    industry VARCHAR(255),
    liveJobs INT,
    lastClientContacted VARCHAR(255),
    lastContacted DATE,


);

--@block

INSERT INTO organisations (id, name, industry, liveJobs, lastClientContacted, lastContacted)
VALUES 
(4, 'Microsoft', 'Technology', 20, 'Alice Johnson', '2021-03-10'),
(5, 'Amazon', 'Retail & Technology', 12, 'Robert White', '2021-04-05'),
(6, 'Ford', 'Automobile', 8, 'Eva Green', '2021-05-20'),
(7, 'Netflix', 'Entertainment', 7, 'Oscar Wilde', '2021-06-01');


