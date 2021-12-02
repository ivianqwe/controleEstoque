const Product = require('../models/Product');

module.exports = {
    async index(req, res){
        try{
            const products = await Product.findAll();

            return res.json(products);
        }catch(error){
            console.log(error);
        }
    },

    async store(req, res){
        try{
            const {name, price} = req.body;

            const product = await Product.create({name, price});

            return res.json(product);

        } catch(error){
            console.log(error);
        }
    },

    async delete(req, res){
        try{
            const { id } = req.params;

            await Product.destroy({
                where: {
                    id
                }
            })

            return res.json({message: `Product ${id} deleted`})
        } catch (error) {
            return res.json(error);
        }
    }
}