import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { FaPlus, FaSearch, FaRegTrashAlt } from 'react-icons/fa';

import Container from "../../components/Container";
import api from "../../services/api";

import {Form, SubmitButton, Produto, List, Header} from './style';



function NewMoviment() {

    // Hooks de estado
    const [usuarios, setUsuarios] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [quantidadeProduto, setquantidadeProduto] = useState('');
    const [produto, setProduto] = useState(0);
    const [items, setItems] = useState([]);
    const [typesMoviment] = useState(['', 'E', 'S']);
    const [typeMoviment, sendTypeMoviment] = useState('');
    const [typesPayment] = useState(['','Dinheiro', 'Cartão de credito', 'Pix']);
    const [typePayment, setTypePayment] = useState('');
    const [clientId, setClientId] = useState(0);
    const [userId, setUserId] = useState(0);

    //  Carregar dados assim que a tela é iniciada
    useEffect (() => {
        async function fetchData() {
            await api.get('/users')
            .then(response => {

                const usuarios = response.data.filter(user => user.active)

                setUsuarios(usuarios);
            })
            .catch(error => {
                console.log(error)
            }) 

            await api.get('/products')
            .then(response => {

                const produtos = response.data.map(user => user)

                setProdutos(produtos);
            })
            .catch(error => {
                console.log(error)
            }) 
        }

        fetchData()

    }, [])

    // Enviar um novo movimento
    async function handleSendMoviment(){
        
        if(!typeMoviment){
            alert('Tipo de movimento não foi preenchido')
            return
        }if(!typePayment){
            alert('Forma de pagamento não foi preenchido')
            return
        }if(!userId){
            alert('Vendedo não foi preenchido')
            return
        }if(!clientId){
            alert('Cliente não foi preenchido')
            return
        }if(!items[0]){
            alert('Dados do produto incompletos')
            return
        }

        api.post(`/users/${userId}/moviments`, {
            type: typeMoviment,
            payment_type: typePayment,
            client_id: clientId,
            items
        })
        .then(response => {
            console.log(response.data)
        })
    }
    
    // Adicionar uma produto ao array de produtos
    function handleAddProducts() {
        // e.preventDefault();

        const product = produtos.find(prod => prod.id === Number(produto));
        
        if(quantidadeProduto <= 0){
            alert('Quantidado do produto tem que ser maior que 0')
            return 
        }if(produto && quantidadeProduto){
            
            const item = {
                product_id: produto,
                quantity: quantidadeProduto,
                price: product.price,
                subTotal: (quantidadeProduto * product.price)
            }

            setItems( [...items, item] )

            setProduto('')
            setquantidadeProduto('')

            document.getElementById("product").value = ""
        }else {
            alert('Precisa preencher todos os campos do produto')
        }
        
    }

    // Remover um produto dos items
    function handleRemoveItem(index){
        const produtos = [...items];

        produtos.splice(index, 1);

        setItems(produtos);
    }

    return(
        
        <Container>
            <Header>
                <h1>Novo movimento</h1>
                <Link to = "/moviments">
                    <FaSearch color="#000" size={14} />
                </Link>
            </Header>

            <Form onSubmit={() => {}}>


                <p>Tipo de movimento</p>
                <select 
                    name="typeMoviments" 
                    id="typeMoviments" 
                    onChange={e => sendTypeMoviment(e.target.value)}
                >
                        {typesMoviment.map(type => (
                            <option
                                key={type} 
                                value={type}>{type}
                            </option>
                        ))}
                </select>

                <p>Forma de pagamento</p>
                <select 
                    name="typePayment" 
                    id="typePayment"
                    onChange={e => setTypePayment(e.target.value)}
                > 
                    {typesPayment.map(type => (
                        <option 
                            key={type}
                            value={type}>{type}
                        </option>
                    ))}
                </select>

                <p>Vendedor</p>
                <select 
                    name="user"
                    id="user"
                    onChange={e => setUserId(e.target.value)}
                > 
                    <option value=""></option>
                    {usuarios.map( usuario => (
                        <option 
                            key={String(usuario.id)} 
                            value={usuario.id}> {usuario.name}
                        </option>
                    ))}
                </select>

                <p>Cliente</p>
                <select 
                    name="client" 
                    id="client"
                    onChange={e => setClientId(e.target.value)}
                > 
                    <option value=""></option>
                    {usuarios.map( usuario => (
                        <option 
                            key={String(usuario.id)} 
                            value={usuario.id}>{usuario.name}
                        </option>
                    ))}
                </select>

                <Produto>
                    <div>
                        <p>Produto</p>
                        <select 
                            name="produto" 
                            id="product"
                            onChange={ e => setProduto(e.target.value)}> 
                            <option value={produto}></option>
                            {produtos.map( produto => (
                                <option 
                                    key={String(produto.id)} 
                                    value={produto.id}>{produto.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <p>Quantidade</p>
                        <input 
                            id = "productQuantity"
                            onChange={ e => setquantidadeProduto(e.target.value)}
                            type = "number" 
                            placeholder=""
                            value={quantidadeProduto}
                        />
                    </div>
                    <div>
                        <button type="button" onClick={handleAddProducts}> 
                            <FaPlus color="#000" size={14}/>
                        </button>
                    </div>
                </Produto>
                
                <List>
                    {!items[0] ? '' : 
                        <li>
                            <span>Pruduto</span> 
                            <span>Preço</span>
                            <span>Quantidade</span>
                            <span>SubTotal</span>
                            <span></span>
                        </li>  
                    }
                    {items.map(  (produto, index) => (
                        <li key={String(index)}>
                            <span>{produto.product_id} </span> 
                            <span>{produto.price} </span>
                            <span>{produto.quantity} </span>
                            <span>{produto.subTotal} </span>
                            <span>{<FaRegTrashAlt 
                                        color="#000" 
                                        size={14}
                                        onClick={() => handleRemoveItem(index)}
                                    />} </span>
                        </li>   
                    ))}
                </List>
                
            
            <SubmitButton onClick={ () => handleSendMoviment()}> Enviar </SubmitButton>
            </Form>

        </Container>
    )
}

export default NewMoviment;