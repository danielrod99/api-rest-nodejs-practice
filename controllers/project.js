var Project=require('../models/project');
var fs=require('fs');
var controller={
    home: function(req,res){
        return res.status(200).send('hi');
    },
    test:function(req,res){
        return res.status(200).send('soy el test');
    },
    saveProject:function(req,res){
        var project=new Project();
        var params=req.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image=null;
        project.save((err,projectStored)=>{
            if(err){
             return   res.status(500).send('Error al guardar');
            }
            if(!projectStored){
                return res.status(404).send('No se ha podido guardar el proyecto');
            }
           return res.status(200).send({
                project:projectStored
            })
        })

        //return res.status(200).send(project)
    },
    getProject:function(req,res){
        var projectId=req.params.id;
        if(projectId==null){
            return res.status(404).send('El objeto no existe');
        }
        Project.findById(projectId,(err,project)=>{
            if(err) return res.status(500).send('Error al devolver los datos');
            if(!project) return res.status(404).send('El objeto no existe');
            return res.status(200).send(project);
        })
    },
    getAllProjects:function (req,res) {
        Project.find().exec((err,projects)=>{
            if(err) return res.status(500).send('Error al devolver los datos');
            if(!projects) return res.status(404).send('El objeto no existe');
            return res.status(200).send(projects);
        })
    },
    updateProject:function(req,res){
        var projectId=req.params.id;
        var update=req.body;
        Project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdated)=>{
            if(err) return res.status(500).send('Error al devolver los datos');
            if(!projectUpdated) return res.status(404).send('El objeto no existe');
            return res.status(200).send({project:projectUpdated});
        });
    },
    deleteProject:function(req,res){
        var projectId=req.params.id;
        Project.findByIdAndDelete(projectId,(err,projectDeleted)=>{
            if(err) return res.status(500).send('Error al eliminar los datos');
            if(!projectDeleted) return res.status(404).send('El objeto no existe');
            return res.status(200).send({project:projectDeleted})
        })
    },
    uploadImage:function (req,res) {
        var projectId=req.params.id;
        var fileName='Imagen No Subida';
        if(req.files){
            var filePath=req.files.image.path;
            var fileSplit=filePath.split('\\');
            var fileName=fileSplit[1];
            var extSplit=fileName.split('.');
            var extension=extSplit[1];
            if(extension=='png'||extension=='jpg'||extension=='jpeg'||extension=='gif'){
                Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,projectUpdated)=>{
                    if(err) return res.status(500).send('Error al subir los datos');
                    if(!projectUpdated) return res.status(404).send('El objeto no existe');
                    return  res.status(200).send(projectUpdated);
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send('Extension no valida');
                })
            }


        }else{
            return  res.status(404).send(fileName);
        }
    }
}
module.exports=controller;