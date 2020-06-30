var express=require('express');
var projectController=require('../controllers/project');

var router=express.Router();
var multipart=require('connect-multiparty');
var multipartMiddleware=multipart({uploadDir:'./uploads'})

router.get('/',projectController.home);
router.get('/test',projectController.test),
router.post('/save-project',projectController.saveProject);
router.get('/project/:id?',projectController.getProject);
router.get('/projects',projectController.getAllProjects);
router.put('/update/:id',projectController.updateProject);
router.delete('/delete/:id',projectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware,projectController.uploadImage);
router.get('/get-image/:image',projectController.getImageFile);
router.get('**',(req,res)=>{
    res.send('error loco');
})

module.exports=router;