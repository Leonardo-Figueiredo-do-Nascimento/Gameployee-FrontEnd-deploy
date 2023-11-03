import {Link} from 'react-router-dom'
import Button from '../Button'
import './header.css'

export default function Header(){
    return(
        <div className="header">
            <a href='/'><h1>Gameployee</h1></a>

            <div className="page-buttons">
                <Link to={"/Desenvolvedores"} className='links'>Desenvolvedores</Link>
                <span>|</span>
                <Link to={"/Empresas"} className='links'>Empresas</Link>
            </div>

            <div className="user-buttons">
                <Button title={'Login'} to="/Login"/>
                <Button title={'Inscreva-se'} to="/Cadastro"/>
            </div>

        </div>
    )
}