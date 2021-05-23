
const Usuario = require('../model/Usuario')
var bcrypt = require('bcrypt')

const { Op } = require('sequelize')


module.exports = {
    async list(req,res){
        const usuarios = await Usuario.findAll()
        return res.render('admin/usuario/list.ejs',{'Usuarios':usuarios, 'msg': req.flash('msg')})
    },
    async filtro(req,res){
        let query = '%'+req.body.filtro+'%'
        const usuarios = await Usuario.findAll({
            where:{
                nome: {
                    [Op.like]: query
                }
            }
        })
        return res.render('admin/usuario/list.ejs',{'Usuarios':usuarios, 'msg': req.flash('msg')})
    },
    async abreadd(req,res){
        res.render('admin/usuario/add.ejs',{msg : req.flash('msg')})
    },   
    async add(req,res){
        const nome = req.body.nome;
        const email = req.body.email;
        var senha = req.body.senha;
        const foto = req.file.foto;

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(senha,salt,(hash)=>{
                senha=hash;
            })
        })


        await Usuario.create({nome, email, senha, foto}).then(
            (usuario) => {
            req.flash('msg',usuario.nome + ' foi adicionado com sucesso!');
            res.redirect('/admin/usuario/add');
        }, (err) => {
            req.flash('msg', "problemas ao adicionar o Usuario: ")
            res.redirect('/admin/usuario/add');
        });
    },
    async abreedit(req,res){
        const id = req.params.id;
        const Usuario = await Usuario.findByPk(id);
        //console.log(Usuario)
        return res.render('admin/usuario/edit.ejs',{'Usuario':usuario, 'msg': req.flash('msg')})

    },
    async edit(req,res){
        const id = req.params.id;
        const usuario = await Usuario.findByPk(id);

        var senha = req.body.senha;
       

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(senha,salt,(hash)=>{
                senha=hash;
            })
        })

        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.senha = senha;
        usuario.foto = req.file.foto;

        usuario.save().then(
            (usuario) => {
                req.flash('msg',usuario.nome + ' foi editado com sucesso!');
                return res.render('admin/usuario/edit.ejs',{'Usuario':usuario, 'msg': req.flash('msg')})
            },
            (err) => {
                req.flash('msg', ' não houve sucesso na edição!');
                return res.render('admin/usuario/edit.ejs',{'Usuario':usuario, 'msg': req.flash('msg')})
                
            }
            );
        
    },
    async del(req,res){
       const id = req.params.id;
       await Usuario.destroy({where:{
           id:id
       }}).then(
        ()=>{
            req.flash('msg', 'Usuario foi deletado com sucesso!');
            res.redirect('/admin/usuario/')
        },
        (err)=>{
            req.flash('msg', 'Problema ao deletar o Usuario!');
            res.redirect('/admin/usuario/')  
        }
        
       );
        
    }
    }
