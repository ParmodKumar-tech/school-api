# 🏫 School Management API (Node.js + MySQL)

This project provides RESTful APIs for managing schools and retrieving them based on proximity using **Node.js**, **Express.js**, and **MySQL**.

---

## 📂 Features

- 📌 Add new schools with name, address, latitude, and longitude.
- 📍 List all schools **sorted by distance** from a given location (haversine formula).
- ✅ Validation to prevent duplicate school entries (name + coordinates).
- 🌐 Supports JSON requests and responses.

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Validation & Utilities**: Custom JS (no ORM)

---

## 📦 API Endpoints

### ➕ " Add School "

- **URL**: `/api/v1/school/addSchool`
- **Method**: `POST`
- **Request Body**:
```json
{
  "name": "ABC School",
  "address": "123 Main St",
  "latitude": 28.6139,
  "longitude": 77.2090
}
Success Response: { "success": true, "message": "School added successfully" }

---

###  " List of Schools "
- **URL**: `/api/v1/school/listSchools?latitude=28.6&longitude=77.2`
- **Method**: `GET`

Success Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "XYZ School",
      "address": "Some St",
      "latitude": 28.7,
      "longitude": 77.1,
      "distance": 2.45
    },
    ...
  ]
}
Distance is in kilometers, rounded to 2 decimals.

---

🛠️ Setup Instructions
1. Clone this repo.
2. Install dependencies: npm install
3. Configure .env file: Create .env in the root:
                      DB_HOST=127.0.0.1
                      DB_USER=root
                      DB_PASSWORD=your_mysql_password
                      DB_DATABASE=school_management_app
                      PORT=4000
4. Run SQL schema:
  --Open MySQL shell or GUI
  --Execute the content from schema.sql

     sql file--

          CREATE DATABASE school_management_app;
          USE school_management_app;
          CREATE TABLE schools (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(20),
            address VARCHAR(30),
            latitude FLOAT,
            longitude FLOAT,
            created TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE KEY unique_school (name, latitude, longitude)
          );


5. Run the server:
npm start

6. Test in Postman or browser:
    Add: POST http://localhost:4000/api/v1/school/addSchool
    List: GET http://localhost:4000/api/v1/school/listSchools?latitude=28.6&longitude=77.2

---

📁 Folder Structure

school-api/
├── src/
│   ├── controllers/
│   │   └── schoolController.js
│   ├── db/
│   │   └── connection.js
|   |   └── schema.sql
│   ├── routes/
│   │   └── schoolRoutes.js
│   └── utils/
│       └── distance.js
├
├── server.js
├── .env
└── README.md







