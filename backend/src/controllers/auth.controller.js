import { query } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 

dotenv.config();

export const registerUser = async (req, res) => {
   const { email, password, role } = req.body;

  if (!email || !password || !role) {
    console.error('Validation failed: Missing fields.');
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    console.log(`Checking if user ${email} exists...`);
    const userCheck = await query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userCheck.rows.length > 0) {
      console.warn(`User ${email} already exists.`);
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    console.log(`User ${email} is new. Hashing password...`);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    
    console.log('Inserting new user into database...');
    const newUser = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id, email, role',
      [email, passwordHash, role]
    );

    console.log('User registered successfully!', newUser.rows[0]);
    res.status(201).json({
      msg: 'User registered successfully!',
      user: newUser.rows[0],
    });

  } catch (err) {
    console.error('!!! CRITICAL ERROR DURING REGISTRATION !!!');
    console.error(err.message);
    console.error(err.stack); 
    res.status(500).send('Server Error (check backend console for details)');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.warn('Login validation failed: Missing fields.');
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const userCheck = await query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = userCheck.rows[0];
    console.log('User found. Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log('Passwords match! Creating JWT...');
    const payload = {
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role
      }
    };

    if (!process.env.JWT_SECRET) {
      console.error('!!! CRITICAL: JWT_SECRET is not defined in .env file !!!');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, 
      (err, token) => {
        if (err) {
          console.error('!!! CRITICAL: JWT signing error !!!', err);
          return res.status(500).json({ msg: 'Error signing token' });
        }
        
        console.log('Login successful. Sending token.');
        res.status(200).json({
          token,
          msg: 'Login successful!'
        });
      }
    );

  } catch (err) {
    console.error('!!! CRITICAL ERROR DURING LOGIN !!!');
    console.error(err.message);
    res.status(500).send('Server Error (check backend console)');
  }
};