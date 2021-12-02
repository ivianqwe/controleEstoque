const Stock = require('../models/Stock');

module.exports = {
    async index(req, res){
        try{
            const stocks = await Stock.findAll();

            return res.json(stocks);
        }catch(error){
            console.log(error);
        }
    },

    async store(req, res){
        try{
            const {name} = req.body;

            const active = true;

            const stocks = await Stock.create({name, active});

            return res.json(stocks);

        } catch(error){
            console.log(error);
        }
    },

    async delete(req, res){
        try{
            const { id } = req.params;

            await Stock.destroy({
                where: {
                    id
                }
            })

            return res.json({message: `Stock ${id} deleted`})
        } catch (error) {
            return res.json(error);
        }
    }
}