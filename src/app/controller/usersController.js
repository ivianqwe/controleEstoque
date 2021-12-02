const User = require('../models/User');

const moment = require('moment');

module.exports = {
    async index(req, res){
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res){
        try {
            const {name, email, birth_day} = req.body;

            const active = true;

            const user = await User.create({name, email, birth_day, active});

            return res.json(user);

        } catch (error) {
            return res.json(error);
        }
    },

    async delete(req, res){
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if(!user){
                return res.json({message: `Cannot find user`})
            }

            User.destroy({
                where: {
                    id
                }
            })

            return res.json({message: `User ${id} deleted`})
        } catch (error) {
            return res.json(error);
        }
    }
}