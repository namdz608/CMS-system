import axios from "axios";

const createNewUser=(data)=>{
    return axios.post('/api/create-new-user',data)
}

const handleLoginApi=(email,password) => {
    return axios.post('/api/login',{email,password})
}

const handleCreateCategory=(data) => {
    return axios.post('/api/create-new-category',data)
}

const handleGetAllCategory=()=>{
    return axios.get('/api/get-all-category')

}

const uploadStatus=(data)=>{
    return axios.post('/api/upload-status',data)
}

const deleteCate=(catId)=>{
    return axios.delete('/api/delete-category',{
        data:{
            id: catId
        }
    })
}

const getAllStatus=()=>{
    return axios.get('/api/get-all-status')
}

const likeAndDis=(data)=>{
    return axios.put('/api/edit-reaction',data)
}

const postComment=(data)=>{
    return axios.post('/api/post-comment',data)
}

const getStatusDate=()=>{
    return axios.get('/api/get-statusDate')
}

const setStatusDate=(data)=>{
    return axios.put('/api/edit-statusDate',data)
}

const getCommentDate=()=>{
    return axios.get('/api/get-commentDate')
}

const setCommentDate=(data)=>{
    return axios.put('/api/edit-commentDate',data)
}

const getAllUser=()=>{
    return axios.get('/api/get-all-users')
}

const getUserStatus=(id)=>{
    return axios.get(`/api/user-status?id=${id}`)
}

const getReactionDash=()=>{
    return axios.get('/api/dashboard-reaction')
}
export {createNewUser,handleLoginApi,handleCreateCategory,handleGetAllCategory,
    uploadStatus,deleteCate,getAllStatus,likeAndDis,postComment,getStatusDate,
    setStatusDate,getCommentDate,setCommentDate,getAllUser,getUserStatus,getReactionDash}