const User = require("../models/UserModel")
const createUser = async(req,res) => {
    try {
        const newUser = User.create(req.body)

        if(newUser){
            res.status(200).json({
                status:"success",
                data: newUser
            })
        }
        res.status(200).json({
            status:"failer",
            data: []
        })
        
    } catch (error) {
        console.error(error);
    }
}