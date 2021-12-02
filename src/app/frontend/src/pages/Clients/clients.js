import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { FaPlus, FaArrowLeft, FaRegTrashAlt } from 'react-icons/fa';
import moment from 'moment';


import Container from "../../components/Container";
import { Form } from "./styles";
import api from "../../services/api";


function Client(){
    // Estados da aplicação
    const [dados, setDados] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthDay] = useState('');

    // Buscar dados ao carregar página 
    useEffect(() => {
        async function fetchData(){
            api.get('/users')
            .then(response => {
                console.log(response.data)
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }

        fetchData()
    }, [])

    function handleClickNewProduct(){

        if(name && email && birthDay){
            api.post('/users', { name, email, birth_day: birthDay})
            .then(response => {
                console.log(response.data)

                setDados([...dados, response.data]);
                setName('');
                setEmail('');
                setBirthDay('');   
            }).catch(error => {
                console.log(error)
            })
        }else{
            alert('Preencher todos campos!');
        }
    }

    async function handleClickDeleteClient(id){
        await api.delete(`/users/${id}`)
        .then(response => {
            console.log(response.data)

            const users = dados.filter(user => user.id !== id)

            setDados(users);

        }).catch(error => {
            console.log(error)
        })
    }

    return(
        <Container>
            <div className="cabeçalho">
                <Link to="/">
                    <FaArrowLeft color="#000" size={14}/>
                </Link>
                <h1>Clientes</h1>
                <FaPlus color="#000" size={14} onClick={handleClickNewProduct}/>
            </div>

            <Form>
                <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="date" placeholder="Data Nascimento" value={birthDay} onChange={(e) => setBirthDay(e.target.value)}/>
            </Form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Data de Nascimento</th>
                            <th>Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map(client => (
                            <tr key={String(client.id)}>
                                <td>{<FaRegTrashAlt color="#000" size={14} onClick={() => handleClickDeleteClient(client.id)}/>}</td>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{moment(client.birth_day, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                <td>{client.active ? 'Sim' : 'Não'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Client;