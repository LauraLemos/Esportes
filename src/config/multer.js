const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        let path = './public/fotos'
        cb(null,path)
        //let é uma var temporaria
    },
    filename:function(req,file,cb){
        let foto = Date.now()+"-"+file.originalname
        cb(null,foto)
    }
});
const upload = multer({storage});
