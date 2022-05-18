import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        res.status(200).json({user: user});
        console.log(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}