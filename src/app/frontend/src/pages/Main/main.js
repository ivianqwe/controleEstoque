import React from "react";

import './main.css';

import Modules from '../../components/Modules/modules';

import { Title } from './styles';

function Main() {
    return (
        <>
            <Title>Controle de estoque</Title>

            <div className="cadastros">
                <Modules text="Usuários" to="/users"/>  
                <Modules text="Produtos" to="/products"/>  
            </div>

            <div className="movimentos">
                <Modules text="Movimentos" to="/moviments" />  
            </div>
        </>
    )
}

export default Main;