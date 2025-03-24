
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '../utils/database.js';

export default async function registrationHandler(req, res) {
  const { hash } = bcryptjs;

  if (req.method === 'POST') {
    try {
      const { username, password, instrument, admin } = req.body;
      console.log('admin:', admin)

      if (!username || !password || !instrument) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Password Hashing
      const hashedPassword = await hash(password, 10);
      console.log('hashed Password', hashedPassword)

      const { usersCollection, client } = await connectToDatabase();

      const token = jwt.sign(
        { userId: new ObjectId(), admin }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const newUser = {
          userId: new ObjectId(),
          admin,
          username,
          password: hashedPassword,
          instrument,
          token
      };
      console.log('New User:', newUser)

      await usersCollection.insertOne(newUser);
      await client.close();

      return res.status(200).json({ message: 'Admin registered successfully', newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } 
}
