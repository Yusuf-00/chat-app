import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getReceiverSocketId } from '../lib/socket.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users for sidebar:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  const otherUserId = req.params.id;
  const loggedInUserId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: loggedInUserId }
      ]
    }).sort({ createdAt: 1 }); // Sort messages by creation time

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req, res) => {
  const receiverId = req.params.id;
  const { text, image } = req.body;
  const senderId = req.user._id;
  
  try {
    let imageUrl;
    if(image) {
        const uploadeResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadeResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();
    
    const recevierSocketId = getReceiverSocketId(receiverId);
    if (recevierSocketId) {
        io.to(recevierSocketId).emit('new-message', newMessage);
    } 
    res.status(201).json(newMessage);

  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};