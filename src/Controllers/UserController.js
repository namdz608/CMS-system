const userService = require('../services/userService') 
class UserControllers{
    handleUploadStatus=async(req, res)=>{
        let data=await userService.handleUploadStatus(req.body)
        return res.status(200).json(data)
    }

    handleGetAllStatus=async(req,res)=>{
        let data=await userService.handleGetAllStatus()
        return res.status(200).json(data)
    }
    handleReaction=async(req, res)=>{
        let data=req.body;
        let user =await userService.updateReaction(data)
        return res.status(200).json(user)
    }
    handlePostComment=async(req, res)=>{
        let data=await userService.handlePostComment(req.body)
        return res.status(200).json(data)
    }
    getUserStatus=async(req,res)=>{
        let data=await userService.getUserStatus(req.query.id)
        return res.status(200).json(data)
    }
}

module.exports = new UserControllers;