import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;

        const filteredUsers=await User.find({_id: {$ne:loggedInUserId}}).select("-password"); //this means find all users except jo hmara apna h kyuki usko message thodi bhejna chahte hum
                                            //^ne means not equal         ^to hide password
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.error("Error in getUsersForSidebar: ",error.message)
        res.status(500).json({error: "Internal server error"});
    }
}