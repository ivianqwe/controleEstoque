const Moviments = require('../models/Moviments');
const MovimentsItems = require('../models/MovimentsItems');
const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            // Buscar dados
            const moviments = await Moviments.findAll({
                include: [ 
                    // Joins com os MODELs
                    {association: 'movimentItems', 
                        // Sub Join
                        include: 'movimentsItemsProduct'},
                    {association: 'userMoviments'},
                    {association: 'clientMoviments'},
                ]
            });

            // Retornar dados para o front
            return res.json(moviments);
        } catch (error) {
            console.log(error)
        }
    },

    async store(req, res){
        try {
            // Receber dados na requisição
            const {user_id} = req.params;
            const { type, nf, total, client_id, payment_type, items } = req.body;

            // Buscar por dados na requisição
            const user = await User.findAll({where: {id: user_id}});
            const client = await User.findAll({where: {id: client_id}});

            // Verificar se as informações existem no banco de dados
            if(!user){
                return res.json({message: `User not found: ${user_id}`})
            }else if (!user[0].active){
                return res.json({message: `User is inactive: ${user_id}`})
            }

            if(!client){
                return res.json({message: `Client not found: ${user_id}`})
            }else if (!client[0].active){
                return res.json({message: `Client is inactive: ${user_id}`})
            }

            // Se passar das verificações, inserir dados 
            const moviments = await Moviments.create({type, nf, total, user_id, client_id, payment_type});

            // Buscar ID da movimentação inserida
            const moviment_id = moviments.id;

            // Percorrer itens
            const movItems = items.map(async item => {
                // Receber dados na requisição
                const {product_id, quantity} = item;
                let price = 0;
                
                // Buscar por dados na requisição de items
                const product = await Product.findAll({where: {id: product_id}});

                // Verificar se as informações existem no banco de dados
                if (!product) {
                    return res.json({message: `Product not found: ${product_id}`});
                }else{
                    // Se exixtirem receber o preço
                    price = product[0].price;
                }

                // Se passar nas verificações inserir dados
                await MovimentsItems.create({quantity, price, moviment_id, product_id});
            })

            // Fazer executar todo loop de forma sincrona 
            await Promise.all(movItems);

            // Buscar dados inseridos
            const movimentsItems = await Moviments.findAll({where: {id: moviment_id}, include: {association: 'movimentItems'}});                        

            // Retornar dados para o front
            return res.json(movimentsItems) 

        } catch (error) {
            console.log(error);
        }
    },

    async delete(req, res){

        const { id } = req.params;

        await MovimentsItems.destroy({
            where: {
                moviment_id: id
            }
        })

        await Moviments.destroy({
            where: {
                id
            }
        })

        return res.json({message: `Moviment ${id} deleted`})
        
    }
}