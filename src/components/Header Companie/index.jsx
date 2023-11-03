import {Link , useParams} from 'react-router-dom'
import Button from '../Button'
import './header.css'

export default function Header(){

    const {companieId, companieName} = useParams()
    
    return(
        <div className="header">
            <a href='/'><h1>Gameployee</h1></a>

            <div className="page-buttons">
                <Link to={`/Usuario/Empresa/${companieId}/${companieName}`} className='links'>Minha empresa</Link>
                <span>|</span>
                <Link to={`/Usuario/Empresa/${companieId}/${companieName}/Candidatos`} className='links'>Candidatos</Link>
            </div>

            <div className="user-buttons">
                <Button title={'Sair'} to={'/'}/>
            </div>

        </div>
    )
}