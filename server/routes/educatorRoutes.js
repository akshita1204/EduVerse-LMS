import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorControllers.js'

const educatorRouter=express.Router()
//add eduator role
educatorRouter.get('/update-role',updateRoleToEducator)
export default educatorRouter;