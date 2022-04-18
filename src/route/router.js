const express =  require('express');
const UserController = require('../Controllers/UserController') ;
const AdminQaController = require('../Controllers/AdminQaController' ) ;
let router = express.Router();
let initWebRoute=(app)=>{
    router.post('/api/create-new-user',AdminQaController.CreateANewUser);
    router.post('/api/login',AdminQaController.handleLogin)
    router.post('/api/create-new-category',AdminQaController.handleCreateCategory)
    router.post('/api/save-user-status',AdminQaController.handleSaveUserStatus)
    router.get('/api/get-all-category',AdminQaController.handleGetAllCategory)
    router.post('/api/upload-status',UserController.handleUploadStatus)
    router.delete('/api/delete-category',AdminQaController.handleDeleteCategory)
    router.get('/api/get-all-status',UserController.handleGetAllStatus)
    router.delete('/api/delete-user',AdminQaController.handleDeleteUser)
    router.get('/api/get-all-user',AdminQaController.handleGetAllUser)
    router.put('/api/edit-reaction',UserController.handleReaction)
    router.post('/api/post-comment',UserController.handlePostComment)
    router.post('/api/set-statusDate',AdminQaController.SetStatusDate)
    router.get('/api/get-statusDate',AdminQaController.getStatusDate)
    router.put('/api/edit-statusDate',AdminQaController.editStatusDate)
    router.post('/api/set-commentDate',AdminQaController.SetCommentDate)
    router.get('/api/get-commentDate',AdminQaController.getCommentDate)
    router.put('/api/edit-commentDate',AdminQaController.editCommentDate)
    router.get('/api/get-all-users',AdminQaController.getAllUsers)
    router.get('/api/user-status',UserController.getUserStatus)
    router.get('/api/dashboard-reaction',AdminQaController.getReactionDashboard)
    return app.use('/',router);
}

module.exports = initWebRoute;