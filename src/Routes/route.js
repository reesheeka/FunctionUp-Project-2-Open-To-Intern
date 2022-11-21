const express = require('express')
const router = express.Router()
const collegeController = require('../Controller/CollegeController')
const internController = require('../Controller/InternController')

router.get("/test-me", (req,res)=>{
    res.status(200).send('Project 2 Group 21')
})

router.post('/functionup/interns' , internController.createIntern)
router.post('/functionup/colleges' , collegeController.createCollege)
router.get('/functionup/collegeDetails' , internController.getCollegeDetails)

module.exports=router