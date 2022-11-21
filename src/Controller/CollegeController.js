const collegeModel = require('../Models/collegeModel')

const createCollege= async (req,res)=>{
    const data = req.body 
    const college = await collegeModel.create(data)
    res.status(201).send({status:true , data : college})
}
module.exports = {createCollege}

// const getCollegeDetails = async (req,res)=>{
//     const {collegeName} = req.query
//     const getdetials = await  collegeModel.find({name:collegeName}).populate('collegeId')
//     res.status(201).send({status:true , data : getdetials})
// }
// module.exports.getCollegeDetails = getCollegeDetails 