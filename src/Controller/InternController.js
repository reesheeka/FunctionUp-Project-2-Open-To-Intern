const internModel = require('../Models/InternModel.js');
const collegeModel = require('../Models/CollegeModel.js');

const { checkEmail, mobileNum, validValue } = require('../Validator/valid.js');


//>----------------------------CREATE-INTERN-API----------------------------<

const createIntern = async (req, res) => {
    try {
        const { name, email, mobile, collegeName } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter Details In Body๐๐๐" });
        }

        if (!validValue(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter Name๐๐๐' });
        }
    
        if (!validValue(email)) {
            return res.status(400).send({ status: false, message: 'Please Enter Email๐๐๐' });
        }
        if (!checkEmail(email)) {
            return res.status(400).send({ status: false, message: 'Please Enter A valid Email๐๐๐!' });
        }

        if (!validValue(mobile)) {
            return res.status(400).send({ status: false, message: 'Please Enter Mobile Number๐๐๐' });
        }
        if (!mobileNum(mobile)) {
            return res.status(400).send({ status: false, message: 'Please Enter A valid Mobile Number๐๐๐!' });
        }

        if (!validValue(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Name๐๐๐' });
        }

        const EmailExist = await internModel.findOne({ email: email })
        if (EmailExist) {
            return res.status(400).send({ status: false, message: 'Email Already Exist๐คฆโโ๏ธ๐คฆ!' })
        }

        const mobExist = await internModel.findOne({ mobile: mobile })
        if (mobExist) {
            return res.status(400).send({ status: false, message: 'Mobile Already Exist๐คฆโโ๏ธ๐คฆ !' })
        }

        const findCollege = await collegeModel.findOne({ name: req.body.collegeName })

        if (findCollege) {
            
            req.body.collegeId = findCollege._id
            
            const createIntern = await internModel.create(req.body)

            return res.status(201).send({ status: true, data: createIntern });

        } else {
            return res.status(400).send({ status: false, message: 'Wrong College Name๐๐๐' });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports.createIntern = createIntern


