import {Link , useParams} from 'react-router-dom'
import Button from '../Button'
import './header.css'

export default function Header(){
    
    const {devId, devName,devCargo} = useParams()
    
    return(
        <div className="header">
            <a href='/'><h1>Gameployee</h1></a>

            <div className="page-buttons">
                <Link to={`/Usuario/Desenvolvedor/${devId}/${devName}/${devCargo}`} className='links'>Meu Perfil</Link>
                <span>|</span>
                <Link to={`/Usuario/Desenvolvedor/${devId}/${devName}/${devCargo}/Vagas`} className='links'>Vagas</Link>
            </div>

            <div className="user-buttons">
                <Button title={'Sair'} to={'/'}/>
            </div>

        </div>
    )
}