const collegeModel = require('../Models/CollegeModel.js');
const internModel = require('../Models/InternModel.js');

const { validValue } = require('../Validator/valid.js');


//>-----------------------------CREATE-COLLEGE API--------------------------------<

const createCollege = async (req, res) => {

    try {
        const { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter details In Body😒😒😒" });
        }

        if (!validValue(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Name😑😑😑' });
        }
       
        if (!validValue(fullName)) {
            return res.status(400).send({ status: false, message: 'Please Enter College FullName😑😑😑' });
        }
        
        if (!validValue(logoLink)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Logolink😑😑😑' });
        }

        const nameExist = await collegeModel.findOne({ name: name })

        if (nameExist) {
            return res.status(400).send({ status: false, message: 'College Name Already Exist🤦‍♀️🤦!' });
        }

        const createCollege = await collegeModel.create(req.body)

        return res.status(201).send({ status: true, data: createCollege });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//>--------------------------GET-COLLEGE-DETAILS-API-----------------------------<

const getCollegeDetails = async (req, res) => {
    try {

        const { collegeName } = req.query
    
        if (!validValue(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter CollegeName😑😑😑' });
        }
 
        const getCollege = await collegeModel.findOne({ name: collegeName })

        if (!getCollege) {
            return res.status(404).send({ status: false, message: 'CollegeName Does Not Exist😑😑😑' });
        }

        const getInterns = await internModel.find({ collegeId: getCollege._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 })

        const details = {
            name: getCollege.name,
            fullName: getCollege.fullName,
            logoLink: getCollege.logoLink,
            interns: getInterns
        }

        return res.status(200).send({ status: true, data: details });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createCollege, getCollegeDetails }
