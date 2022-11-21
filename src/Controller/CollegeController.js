const collegeModel = require('../Models/collegeModel')
const {checkName ,checkUrl , validValue} = require('../Validator/valid')


const createCollege= async (req,res)=>{

    try {
        const {name , fullName , logoLink} = req.body 

        if(!validValue(name) ) {
            return res.status(400).send({status:false , message :'Please Enter College Name'})
        }
        if(!checkName(name)){
            return res.status(400).send({status:false , message :'Please Enter A Valid College Name'})
        }
        if(!validValue(fullName)){
            return res.status(400).send({status:false , message :'Please Enter College Full-Name'})
        }
        if(!checkName(fullName)){
    
            return res.status(400).send({status:false , message :'Please Enter A Valid College Full-Name'})
        }
        if(!validValue(logoLink)){
            return res.status(400).send({status:false , message :'Please Enter College Logo- ink'})
        }
        if(!checkUrl(logoLink)){
            return res.status(400).send({status:false , message :'Please Enter A Valid Logo- ink'})
        }
    
        const nameExist = await collegeModel.findOne({$or:[ { name:name} ,{fullName:fullName}]})
    
        if(nameExist)  return res.status(400).send({status:false , message :'College Name Already Exist'}) 
    
        const LogoExist = await collegeModel.findOne({logoLink:logoLink})
    
        if(LogoExist)  return res.status(400).send({status:false , message :'Logo URL Already Exist'}) 
    
        const college = await collegeModel.create(req.body)
        res.status(201).send({status:true , data : college})
    } catch (error) {
        res.status(500).send({status:false , message:error.message})
    }

   
}
module.exports = {createCollege}

// const getCollegeDetails = async (req,res)=>{
//     const {collegeName} = req.query
//     const getdetials = await  collegeModel.find({name:collegeName}).populate('collegeId')
//     res.status(201).send({status:true , data : getdetials})
// }
// module.exports.getCollegeDetails = getCollegeDetails 