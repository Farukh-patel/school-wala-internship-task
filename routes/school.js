import { Router } from "express";
import db from "../controllers/db.js";

const router = Router();

router.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ error: "Latitude and longitude must be numbers" });
  }

  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;
  const values = [name, address, latitude, longitude];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error inserting school:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.json({ message: "School added successfully!", insertedId: results.insertId });
  });
});
// for list of schools

router.get("/listSchools", (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Valid latitude and longitude are required" });
  }

  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }

    // haversine formula for distance calculation.
    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // distance in km
    }

    const schoolsWithDistance = results.map(school => ({
      ...school,
      distance: getDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
});

export default router;
