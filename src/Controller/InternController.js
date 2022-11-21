const InternModel = require('../Models/InternModel')
const collegeModel = require('../Models/collegeModel')
 

const createIntern= async (req,res)=>{
    try {
        const data = req.body 
        const findCollegeId = await collegeModel.findOne({name:data.collegeName})
        if(findCollegeId){
            req.body.collegeId=findCollegeId._id
            const internData = await InternModel.create(data)
            res.status(201).send({status:true , data : internData})
        }else{
            res.status(400).send({status:false , msg : 'wrong college name '})
        }
        
    } catch (error) {
        res.send(error.message)
    }

}
module.exports = {createIntern}

const getCollegeDetails = async (req,res)=>{
    const {collegeName} = req.query
    const getCollege = await  collegeModel.findOne({name:collegeName})
    // console.log(getCollege)
    const getInterns = await  InternModel.find({collegeId:getCollege._id})
    // console.log(getInterns)
 
//  getCollege.collegeId = getInterns
    // console.log(data)
    // .populate('collegeId')
    res.status(201).send({status:true , data : getCollege})
}
module.exports.getCollegeDetails = getCollegeDetails

// const obj = {
//     a:1,
//     b:2
// }

// obj.c=[1,2,3]
// console.log(obj)








