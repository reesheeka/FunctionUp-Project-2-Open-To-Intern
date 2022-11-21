const InternModel = require('../Models/InternModel')
const collegeModel = require('../Models/collegeModel')

const  { checkName ,checkEmail  ,mobileNum  , validValue} = require('../Validator/valid')

const createIntern= async (req,res)=>{
    try {
        const {name,email ,mobile ,collegeName} = req.body 

        if(!validValue(name)){
            return res.status(400).send({status:false , message :'Please Enter Name'})
        }
        if(!checkName(name)){
            return res.status(400).send({status:false , message :'Please Enter A Valid Name'})
        }
        if(!validValue(email)){
            return res.status(400).send({status:false , message :'Please Enter E-mail'})
        }
        if(!checkEmail(email)){
            return res.status(400).send({status:false , message :'Please Enter A valid E-mail'})
        }
        if(!validValue(mobile)){
            return res.status(400).send({status:false , message :'Please Enter Mobile Number !'})
        }
        if(!mobileNum(mobile)){
            return res.status(400).send({status:false , message :'Please Enter A valid Mobile Number !'})
        }
        if(!validValue(collegeName)){
            return res.status(400).send({status:false , message :'Please Enter College -Name !'})
        }
        if(!checkName(collegeName)){
            return res.status(400).send({status:false , message :'Please Enter A Valid College Name'})
        }
         
        const EmailExist = await InternModel.findOne({email:email})
        if(EmailExist)   return res.status(400).send({status:false , message :'Email Already Exist- !'})

        const mobExist = await InternModel.findOne({mobile:mobile})
        if(mobExist)   return res.status(400).send({status:false , message :'Mobile Already Exist- !'})

        const findCollegeId = await collegeModel.findOne({name:req.body.collegeName})
        if(findCollegeId){
            req.body.collegeId=findCollegeId._id
            const internData = await InternModel.create(req.body)
            res.status(201).send({status:true , data : internData})
        }else{
            res.status(400).send({status:false , msg : 'wrong college name '})
        }
        
    } catch (error) {
        res.status(500).send({status:false , message:error.message})
    }

}
module.exports.createIntern = createIntern

const getCollegeDetails = async (req,res)=>{
    try {
        const {collegeName} = req.query
        if(!validValue(collegeName)){
            return res.status(400).send({status:false , message :'Please Enter College-Name !'})
        }
        const getCollege = await  collegeModel.findOne({name:collegeName})
        if(!getCollege) return  res.status(400).send({status:false , message :'College-Name Doed not Exist !'})
  
        const getInterns = await  InternModel.find({collegeId:getCollege._id}).select({name:1,email:1,mobile:1,_id:1 })
         const details = {
                        name: getCollege.name,
                        fullName: getCollege.fullName,
                        logoLink: getCollege.logoLink,
                        interns: getInterns
                    };
    
        res.status(201).send({status:true , data : details})
    } catch (error) {
        res.status(500).send({status:false , message:error.message})
    }
   
}
module.exports.getCollegeDetails = getCollegeDetails
