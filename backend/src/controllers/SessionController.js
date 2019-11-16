// Index = retorna uma listagem de sessões
// show = Lista uma unica listagem de sessões
// Store = cria uma sessão
// update = quando quer alterar uma sessão
// destroy = quando quer remover/deletar sessões


const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });

        //O que esse if quer dizer é: Se usuario não existir, crie um usuario
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};