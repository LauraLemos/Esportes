const { restore } = require('../model/Produto');
const Produto = require('../model/Produto')

module.exports = {
    async list(req,res){

    },
    async filtro(req,res){

    },
    async abreadd(req,res){
        res.render('admin/produto/add.ejs',{msg : req.flash('msg')})
    },   
    async add(req,res){
        const { nome, valor, tipo } = req.body;
        await Produto.create({nome, valor, tipo}).then(
            (produto) => {
            req.flash('msg',produto.nome + 'Foi adicionado com sucesso!');
            res.redirect('/admin/produto/add');
        }, (err) => {
            req.flash('msg', "problemas ao adicionar o produto: ")
            res.redirect('/admin/produto/add');
        });
    },
    async abreedit(req,res){

    },
    async edit(req,res){

    },
    async del(req,res){

    }
}