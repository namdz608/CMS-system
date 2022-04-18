const adminService = require('../services/adminService');
class AdminQaController{
    CreateANewUser=async(req, res)=>{
        let message= await adminService.createNewUser(req.body)
        return res.status(200).json(message)
    }

    handleLogin=async(req, res)=>{
        let email=req.body.email
        let password=req.body.password
        if(!email || !password){
            return  res.status(200).json({
                errCode:1,
                message:'Missing input parameters'
                })
        }
        let userInfo=await adminService.handleUserLogin(email,password)
        return res.status(200).json(
            userInfo
        )
    }

    handleCreateCategory=async(req, res)=> {
        let categorytype=req.body.categorytype
         let a=await adminService.handleCreateCategory(categorytype)
        
        return res.status(200).json(a)
    }

    handleSaveUserStatus=async(req, res)=>{
        let status=await adminService.handleSaveUserStatus(req.body)
        return res.status(200).json(status)
    }

    handleGetAllCategory=async(req, res)=>{
        let cat=await adminService.handleGetAllCategory()
        return res.status(200).json(cat)
    }

    handleDeleteCategory=async(req, res)=>{
        let a=req.body.id
        if(!a){
            return res.status(200).json({
                errCode:1,
                errMessage:'Missing Input Id'
            })
        }
        else{
            let del= await adminService.deleteCategory(a)
            return res.status(200).json(del)
        }
    }
    handleDeleteUser=async(req, res) =>{
        let a=req.body.id
        if(!a){
            return res.status(200).json({
                errCode:1,
                errMessage:'Missing Input Id'
            })
        }
        else{
            let del= await adminService.deleteUser(a)
            return res.status(200).json(del)
        }
    }

    handleGetAllUser=async(req, res)=>{
        let user=await adminService.handleGetAllUser()
        return res.status(200).json(user)
    }

    SetStatusDate=async(req, res)=>{
        let status=await adminService.SetStatusDate(req.body)
        return res.status(200).json(status)
    }

    getStatusDate=async(req, res)=>{
        let user=await adminService.getStatusDate()
        return res.status(200).json(user)
    }

    editStatusDate=async(req, res)=>{
        let data=req.body;
        let user =await adminService.editStatusDate(data)
        return res.status(200).json(user)
    }

    SetCommentDate=async(req, res)=>{
        let status=await adminService.SetCommentDate(req.body)
        return res.status(200).json(status)
    }

    getCommentDate=async(req, res)=>{
        let user=await adminService.getCommentDate()
        return res.status(200).json(user)
    }

    editCommentDate=async(req, res)=>{
        let data=req.body;
        let user =await adminService.editCommentDate(data)
        return res.status(200).json(user)
    }

    getAllUsers=async(req, res)=>{
        let cat=await adminService.getAllUsers()
        return res.status(200).json(cat)
    }
    getReactionDashboard=async(req, res)=>{
        let cat=await adminService.getReactionDashboard()
        return res.status(200).json(cat)
    }
}
module.exports=new AdminQaController