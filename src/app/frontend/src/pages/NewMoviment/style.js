import styled from "styled-components";
import { darken } from 'polished';

export const Form = styled.form`
    margin-top:  30px;
    display: flex;
    flex-direction: column;

    input{
        border: 1px solid #eee;
        background: #eee;
        height: 25px;
        margin: 5px;
        border-radius: 5px;
        font-size: 14px;
        transition: background 0.3s;

        &:hover{
            background: ${darken(0.03, '#eee')}
        }
    }

    select{
        border: 1px solid #eee;
        background: #eee;
        height: 25px;
        margin: 5px;
        border-radius: 5px;
        font-size: 14px;
        transition: background 0.3s;

        &:hover{
            background: ${darken(0.03, '#eee')}
        }
    }
`
export const SubmitButton = styled.button`
    margin-top: 10px;
    background: #eee;
    border: 0;
    padding: 0 15px;
    border-radius: 5px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;

    &:hover{
        background: ${darken(0.03, '#eee')}
    }
`;

export const Produto = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;


    select {
        width: 100px;
    }

    button{
        border: 0;
        background: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li{
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    span{
        margin: 0 30px;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`