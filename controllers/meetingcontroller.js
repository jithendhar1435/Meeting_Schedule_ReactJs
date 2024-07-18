import Meeting from "../models/meetModel.js";
import UserModel from "../models/UserModel.js";

// Create a new meeting
export const createMeeting = async (req, res) => {
    try {
      const { title, description, date, startTime} = req.body;
      const createdBy=req.user;
  
      // Validations
      if (!title) {
        return res.send({ message: "Title is Required" });
      }
   
      if (!startTime) {
        return res.send({ message: "Start time is Required" });
      }
      if (!createdBy) {
        return res.send({ message: "Creator is Required" });
      }
  
      // Check if user exists
      const existingUser = await UserModel.findById(req.user._id);
      if (!existingUser) {
        return res.status(400).send({
          success: false,
          message: "Creator does not exist",
        });
      }
  
      // Create meeting
      const meeting = new Meeting({
        title,
        description,
        date,
        startTime,
        createdBy,
      });
  
      // Save meeting
      const savedMeeting = await meeting.save();
  
      res.status(201).send({
        success: true,
        message: "Meeting created successfully",
        meeting: savedMeeting,
      });
    } catch (error) {
      console.error('Error creating meeting:', error);
      res.status(500).send({
        success: false,
        message: "Error in creating meeting",
        error,
      });
    }
  };

export const readMeetings = async (req,res) => {
    try {
      const meetings = await Meeting.find();
      return res.status(200).send({
        success:true,
        meetings
    })
      
    } catch (error) {
      console.error('Error reading meetings:', error);
    }
  };
  
 export const readMeetingById = async (req,res) => {
    const {id}=req.params
    try {
      const meeting = await Meeting.findById(id);
      
      return res.status(200).send({
        success:true,
        meeting
    })
    } catch (error) {
      console.error('Error reading meeting:', error);
    }
  };

  export const updateMeeting = async (req,res) => {
    const {id}=req.params;
    const updateData=req.body
    updateData.updatedAt= Date.now()
    try {
      const updatedMeeting = await Meeting.findByIdAndUpdate(id, updateData, { new: true });
      
      return res.status(200).send({
        success:true,
        updatedMeeting
    })
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  export const deleteMeeting = async (req,res) => {
    const {id}=req.params;
    try {
      const deletedMeeting = await Meeting.findByIdAndDelete(id);
    
      return res.status(200).send({
        success:true,
        message:"Meeting deleted"
    })
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };
  