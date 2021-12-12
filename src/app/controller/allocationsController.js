const Allocation = require('../models/Allocations');
const Product = require('../models/Product');
const Stock = require('../models/Stock');

module.exports = {
    async index(req, res){
        try{
            // Buscar dados 
            const allocations = await Allocation.findAll();

            // Retornar dados para o front
            return res.json(allocations);
        }catch(error){
            console.log(error);
        }
    },

    async store(req, res){
        try{
            // Receber dados na requisição
            const { product_id, quantity} = req.body;
            const { stock_id } = req.params;
            
            // Buscar por dados recebidos na requisição
            const checkProduct = await Product.findByPk(product_id);
            const checkStock = await Stock.findByPk(stock_id);

            // Verificar se as informações existem no banco de dados
            if(!checkProduct){
                return res.json('Product not found')
            }
            if(!checkStock){
                return res.json('Stock not found')
            }

            // Buscar dados de alocações
            const [checkAllocationsProduct] = await Allocation.findAll({where: {product_id, stock_id}});

            // Verificar se tem alocação para o produto/estoque
            if(checkAllocationsProduct){ 
                // Se tiver alocação para o produto/estoque atualizar a alocação para o novo valor
                const allocation = await Allocation.update(
                    {quantity: checkAllocationsProduct.dataValues.quantity + quantity},
                    {returning: true, where: {product_id, stock_id}}
                )

                // Retornar dados para o front
                return res.json(allocation);
            }
            
            // Se não tiver uma alocação para o produto/estoque cadastrar alocação com os dados recebidos na requisição
            const allocations = await Allocation.create({stock_id, product_id, quantity});

            // Retornar dados para o front
            return res.json(allocations);

        } catch(error){
            console.log(error);
        }
    },

    async delete(req, res){
        try{
            // Buscar ID na requisição
            const { id } = req.params;

            // Deletar registro que contenha o ID
            await Allocation.destroy({
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