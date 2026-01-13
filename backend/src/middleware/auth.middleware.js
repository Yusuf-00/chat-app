import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, NO Token Provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return  res.status(401).json({ message: 'Not authorized, Invalid Token' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};