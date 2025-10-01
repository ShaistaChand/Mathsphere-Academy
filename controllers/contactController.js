import { sendContactNotification, sendConfirmationEmail } from '../utils/emailService.js';

// In-memory storage (replace with database later)
let contacts = [];
let nextId = 1;

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, grade, board } = req.body; // CHANGED: grade, board instead of subject, message
    
    // Basic validation - UPDATED for demo form fields
    if (!name || !email || !phone || !grade || !board) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: name, email, phone, grade, and board'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }
    
    // Create contact object - UPDATED for demo form
    const newContact = {
      id: nextId++,
      name,
      email,
      phone,
      grade,
      board,
      date: new Date().toISOString(),
      status: 'new',
      type: 'demo_request' // Added to distinguish from general contact
    };
    
    // Add to storage
    contacts.push(newContact);
    
    // Send notification email to admin - UPDATED message
    const adminEmailSent = await sendContactNotification(newContact);
    // enable once email is setpup
    
    // Send confirmation email to user
    const userEmailSent = await sendConfirmationEmail(email, name); // enable once email is setpup

    // Return success response
    res.status(201).json({
      success: true,
      data: newContact,
      message: 'Demo request submitted successfully! We will contact you shortly to schedule your free demo class.',
      emails: {
        admin: adminEmailSent, // adminEmailSent,
        user: userEmailSent 
        // admin: false, 
        // user: false
      }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while processing demo request'
    });
  }
};

export const getContacts = (req, res) => {
  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts
  });
};

// Remove unused functions or keep if needed
export const updateContactStatus = (req, res) => {
  // ... keep if needed
};

export const deleteContact = (req, res) => {
  // ... keep if needed
};