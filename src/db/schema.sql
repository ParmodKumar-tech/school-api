CREATE DATABASE school_management_app;
USE school_management_app;

CREATE TABLE schools(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(150) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE KEY unique_school(name,latitude,longitude)
);