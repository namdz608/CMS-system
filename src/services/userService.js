const db  = require('../models/index');
const emailService = require('./emailService');
let handleUploadStatus=async(data)=>{
    try{
        if(!data.categoryId || !data.contentHtml){
            return{
                errCode:1,
                errMessage:'Missing Input Parameters'
            }
        }
        else{          
                let status =  await db.Status.create({
                    userId:data.userId,
                    categoryId:data.categoryId,
                    contentHtml:data.contentHtml,
                    contentMarkdown:data.contentMarkdown,
                    files:data.files,
                })
            if(status){
                 await db.Reaction.create({
                    userId:data.userId,
                    like:0,
                    dislike:0,
                    statusId:status.id,
                })
            }

            let Qa= await db.User.findAll({
                where:{role:'QA Coordinator'},
                attributes:{exclude:['password']},
            })

                
                await emailService.sendSimpleEmail({
                    id:data.userId,
                    data:Qa,
                    name:data.firstName,
                })
            
            
            return{
                errCode:0,
                errMessage:'Successfully',
                data:status
            }
        }
    }catch(e){
        return e
    }
}

let handleGetAllStatus = async()=>{
    try{
        let data=await db.Status.findAll({
            include:[
                {model:db.User,attributes:['firstName','lastName','image','email']},
                {model:db.Category,attributes:['categorytype','id']},
                {model:db.Reaction,attributes:['like','dislike','statusId']},
                {model:db.Comment,attributes:['id','comment','userId','statusId'],
                include:[
                    {model:db.User}
                ],},
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
    }catch(e){
        return e
    }
}

let updateReaction=async(data)=>{
    try{
        if(!data.statusId){
            return{
                errCode:1,
                errMessage:"Missing status"
            }
        }
        let react=await db.Reaction.findOne({
            where: {statusId:data.statusId},
            raw:false
        })

        if(react){
            react.like=data.like
            react.dislike=data.dislike
           await react.save()
         await emailService.sendSimpleEmail1({
             userSent: data.user,
             userReceived: data.statusOwner,
             state:data.state
         })
            return{
                errCode:0,
                errMessage:'Update successfully'
            }
        }
        else{
            return{
                errCode:2,
                errMessage:'Not Found'
            }
        }
    }catch(e){
        return e
    }
}

let handlePostComment=async(data)=>{
    try{
        if(!data.comment){
            return{
                errCode:1,
                errMessage:'Missing Input Parameters'
            }
        }
        else{
            let a=await db.Comment.create({
                userId:data.userId,
                statusId:data.statusId,
                comment:data.comment,               
            })
            return{
                errCode:0,
                errMessage:'Successfully',
                data:a
            }
        }
    }catch(e){
        return e
    }
}
let getUserStatus=async(id)=>{
    try{
        if(!id){
            return{
            errCode:1,
            errMessage:'Missing Input Parameters'
            }
        }
        
            let status=await db.Status.findAll({
                where: {userId:id},
                include:[
                    {model:db.User,attributes:['firstName','lastName','image','email']},
                    {model:db.Category,attributes:['categorytype','id']},

                ],
                raw:false
            })
            if(!status){
                return{
                    errCode:2,
                    errMessage:'Invalid'
                }
            }
            else{
                return{
                    status,
                    errCode:0,
                    errMessage:'Successfully'
                }
            }
        
    }catch(e){

    }
}
module.exports={handleUploadStatus,handleGetAllStatus,updateReaction,
    handlePostComment,getUserStatus}



