import {db} from "../db/connection.js";
import { haversineDistance } from '../utils/distance.js';

export const addSchool = async (req, res) => {
 
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude))
    return res.status(400).json({ success: false, message: "Invalid input" });
 
  try {
    const [existing] = await db.query(
      "SELECT * FROM schools WHERE name = ? OR (latitude = ? AND longitude = ?)",
      [name, latitude, longitude]
    );
    
    if (existing.length >0) {
      return res.status(409).json({
        success: false,
        message: "Duplicate school. Already exists with same name and coordinates.",
      });
    }

    await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    res.status(200).json({ success: true, message: "School added successfully" });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (isNaN(latitude) || isNaN(longitude)) 
    return res.status(400).json({ success: false, message: "Invalid coordinates" });
  

  try {
    const [rows] = await db.query("SELECT * FROM schools");
    const sorted = rows.map(school => {
      const distance = haversineDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school,  distance: parseFloat(distance.toFixed(2))+" km"  };
    }).sort((a, b) => a.distance - b.distance);

    res.json({ success: true, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
