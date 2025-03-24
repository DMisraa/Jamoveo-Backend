import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../utils/database.js';

export default async function login(req, res) {
    const { username, password } = req.body;

    try {
      const { usersCollection } = await connectToDatabase();
      const user = await usersCollection.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, admin: user.admin }, // Include `admin` in token
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
  
      res.json({ token, admin: user.admin }); // Send `admin` status to frontend
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};


