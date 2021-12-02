import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlus, FaArrowLeft, FaRegTrashAlt } from 'react-icons/fa';
import moment from 'moment';

import Container from "../../components/Container";
import { Form } from "./styles";
import api from "../../services/api";

function Product() {
    const [dados, setDados] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // Bucar dados ao carregra a página
    useEffect(() => {
        async function fetchData(){
            api.get('/products')
            .then(response => {
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchData();
    }, [])
    
    // Adicionar dados ao produto 
    function handleClickNewProduct(){
        // Veficar se o FORMs foram preenchidos
        if(name && price){
            // Se preenchidos adicinar valores no banco
            api.post('/products', { name, price })
            .then(response => {
                // Se a reuqisição for bem sucedida
                // Adicionar os retornos aos dados para renderizar os dados na tela 
                setDados([...dados, response.data]);
                setName('');
                setPrice('');   
            }).catch(error => {
                // Se a reuquisição não tiver sucesso apresentar error no console
                console.log(error)
            })
        }else{
            alert('Preencher todos campos!');
        }
    }

    async function handleClickDeleteProduct(id){
        
        await api.delete(`/products/${id}`)
        .then(response => {
            const products = dados.filter(product => product.id !== id)

            setDados(products);

            alert(response.data.name)
        })
        
    }

    return(
        <Container>
            <div className="cabeçalho">
                <Link to="/">
                    <FaArrowLeft color="#000" size={14}/>
                </Link>
                <h1>Produtos</h1>
                <FaPlus color="#000" size={14} onClick={handleClickNewProduct}/>
            </div>

            <Form className="newProduct">
                <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                <input placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </Form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map(product => (
                            <tr key={String(product.id)}>
                                <td>{<FaRegTrashAlt color="#000" size={14} onClick={() => handleClickDeleteProduct(product.id)}/>}</td>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{moment(product.createdAt).format('DD/MM/YYYY hh:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Product