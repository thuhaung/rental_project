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

export const getUserGeneralInfo = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({_id: userId});
        const info = {
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            is_verified: user.is_verified,
            total_ratings: user.total_ratings,
            rating_count: user.rating_count,
        }
        res.status(200).send(info);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}