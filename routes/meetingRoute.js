import express, { Router } from 'express'
import { isAdmin , requireSignIn } from '../middlewares/authMiddleware.js'
import { createMeeting, deleteMeeting, readMeetingById, readMeetings, updateMeeting } from '../controllers/meetingcontroller.js'

const router =express.Router()

router.post("/createmeeting",requireSignIn,createMeeting)

router.get("/all_meetings",requireSignIn,isAdmin,readMeetings)

router.get("/meeting/:id",requireSignIn,readMeetingById)

router.put("/updatemeet/:id",requireSignIn,isAdmin,updateMeeting)

router.delete("/deletemeet/:id",requireSignIn,isAdmin,deleteMeeting)

export default router
