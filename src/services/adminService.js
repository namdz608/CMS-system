const bcrypt = require('bcrypt');
const db = require('../models/index');
var salt = bcrypt.genSaltSync(10);

let createNewUser=async(data)=>{
    try{
        //check if email is exist
        let check =await checkUserEmail(data.email)
        if(check === true){
            return{
                errCode:1,
                errMessage:'This email is already exist'
            }
        }
        else{
            let hashUserPass= await hashPasswords(data.password)
        await db.User.create({
            email: data.email,
            password: hashUserPass,
            firstName: data.firstName,
            lastName: data.lastName,          
            role:data.role,
            image: data.image,
        }) 
        return{
            errCode:0,
            errMessage:'Successfully'
        }
        }
    }catch(e){
        return e;
    }
}

let hashPasswords=(password)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            var hash=await bcrypt.hashSync(password,salt)
            resolve(hash);
        }catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = async(userEmail) => {
    
        try{
            let user= await db.User.findOne({
                where : {email: userEmail}
            })
            if(user){
                return true
            }
            else{
                return false
            }
        }catch(err){
            console.log(err)
        }
    
}


let handleUserLogin=async(email,password)=>{
    try{
        let userInfo={}
        let isExist= await checkUserEmail(email)
        if(isExist){
            let user= await db.User.findOne({
               
                where:{email:email},

            })
            console.log('chek user',user)
            if(user){
                let check= await bcrypt.compareSync(password, user.password)
                                   if(check){
                                       userInfo.errCode=0;
                                       userInfo.errMessage='Success'
                                       delete user.password;
                                       userInfo.user=user;
                                   }
            }
            else{
                userInfo.errCode=3;
                userInfo.errMessage='Does not exist in the database'
            }

        }
        else{
            userInfo.errCode=2;
            userInfo.errMessage='Email does not exist'
        }
        return userInfo
    }catch(e){
        return e
    }
}

let handleCreateCategory=async(categorytype) => {
    try{
        if(!categorytype){
            return{
                errMessage:'Missing input parameters',
                errCode:1
            }
        }
        else{           
            await db.Category.create({
                categorytype:categorytype
            })
            return{
                errMessage:'Successfully created category',
                errCode:0,
            }
        }
    }catch(e){ return e}
}

let handleGetAllCategory=async()=>{
    try{
        let data=await db.Category.findAll();
        if(!data){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            return {
                data:data,
                errCode:0,
                errMessage:'Found'
            }
        }
    }catch(e){ return e}
}

let deleteCategory=async(id)=>{
    try{
        let category=await db.Category.findOne({
            where:{id:id,}
        })
        if(!category){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            let status=await db.Status.findOne({
                where:{categoryId:id}
            })
            
            if(!status){
                await db.Category.destroy({
                    where:{id:id}
                })
                return{
                    errCode:0,
                    errMessage:'Successfully',
                }                
            }
           else{
                return{
                    errCode:4,
                    errMessage:'Cannot Delete'
                }
           }
        }
    }catch(e){
        return e
    }
}

let deleteUser=async(id)=>{
    try{
        let category=await db.User.findOne({
            where:{id:id}
        })
        if(!category){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            await db.User.destroy({
                where:{id:id},
            })
            await db.Status.destroy({
                where:{userId:id}
            })
            return{
                errCode:0,
                errMessage:'Successfully'
            }
        }
    }catch(e){
        return e
    }
}

let handleGetAllUser=async()=>{
    try{
        let data=await db.User.findAll();
        if(!data){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            return {
                data,
                errCode:0,
                errMessage:'Found'
            }
        }
    }catch(e){ return e}
}

let SetStatusDate=async(data)=>{
    try{
        if(!data.startDate || !data.endDate){
            return{
                errMessage:'Missing Input Date',
                errCode:1
            }
        }
        else{
            let a=await db.DeadlineStatus.create({
                startDate:data.startDate,
                endDate:data.endDate
            })
            return{
                date:a,
                errCode:0,
                errMessage:'Ok'
            }
        }
    }catch(e){ 
        return e
    }
}

let getStatusDate=async()=>{
    try{
        let date=await db.DeadlineStatus.findOne({
            where: {id:1}
        })
        if(!date){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            return{
                data:date,
                errCode:0,
                errMessage:'Successfully'
            }
        }
    }catch(e){
        return e;
    }
}
let editStatusDate=async(data)=>{
    try{
        let a=await db.DeadlineStatus.findOne({
            where: {id:1},
            raw:false,
        })
        a.startDate=data.startDate
        a.endDate=data.endDate
        await a.save();
        return{
            errMessage:'Edit Ok',
            errCode:0
        }
    }catch(e){
        return e;
    }
}

let SetCommentDate=async(data)=>{
    try{
        if(!data.startDate || !data.endDate){
            return{
                errMessage:'Missing Input Date',
                errCode:1
            }
        }
        else{
            let a=await db.DeadlineComment.create({
                startDate:data.startDate,
                endDate:data.endDate
            })
            return{
                date:a,
                errCode:0,
                errMessage:'Ok'
            }
        }
    }catch(e){ 
        return e
    }
}

let getCommentDate=async()=>{
    try{
        let date=await db.DeadlineComment.findOne({
            where: {id:1}
        })
        if(!date){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            return{
                data:date,
                errCode:0,
                errMessage:'Successfully'
            }
        }
    }catch(e){
        return e;
    }
}

let editCommentDate=async(data)=>{
    try{
        let a=await db.DeadlineComment.findOne({
            where: {id:1},
            raw:false,
        })
        a.startDate=data.startDate
        a.endDate=data.endDate
        await a.save();
        return{
            errMessage:'Edit Ok',
            errCode:0
        }
    }catch(e){
        return e;
    }
}

let getAllUsers=async() =>{
    try{
        let user= await db.User.findAll({attributes:{exclude:['password','image']}})
        if(user){
            return {
                user,
                errMessage:'Get All Users Successfully',
                errCode:0
            }
        }
        else{
            return {
                errMessage:'Get All Users Failure',
                errCode:1
            }
        }
    }
    catch(e){ return e}
}

let getReactionDashboard=async()=>{
    try{
        let data=await db.Status.findAll({
            limit:5,
            attributes:['id'],
            include:[
                {model:db.User,attributes:['firstName','lastName','email']},
                {model:db.Reaction,attributes:['like','dislike','statusId']},
            ],
            order: [
                [db.Reaction, 'like', 'DESC'],
                // Sorts by COLUMN_NAME_EXAMPLE in ascending order
                // [db.Reaction, 'disLike', 'ASC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
            ],
            raw:false
        })
        if(data){
            
            return{
                errCode:0,
                errMessage:"Get successful",
                data:data
            }
        }
        else{
            return{
                errCode:2,
                errMessage:"Not founds"
            }
        }
    }catch(e){
        return e
    }
}
module.exports={createNewUser:createNewUser,handleUserLogin:handleUserLogin,
    handleCreateCategory:handleCreateCategory,handleGetAllCategory,deleteCategory,
    deleteUser,handleGetAllUser,SetStatusDate,getStatusDate,editStatusDate,
    editCommentDate,getCommentDate,SetCommentDate,getAllUsers,getReactionDashboard}