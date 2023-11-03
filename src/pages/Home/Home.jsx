import "./Home.css"
import Button from '../../components/Button'
import Header from '../../components/Header/index.jsx'

export default function Home(){
    return(
        <div className='container'>
            <Header/>
            <div className="content">
                <h2>Olá desenvolvedores, sejam bem vindos ao Gameployee</h2>
                <br/>
                <br/>
                <p>No mundo de hoje o mercado de desenvolvimento de jogos digitais brasileiro e internacional
                enfrenta o desafio de achar profissionais e empresas focadas no desenvolvimento de jogos, para isso
                o Gameployee foi desenvolvido.
                </p>
                <br/>
                <br/>
                <p>O Gameployee é uma plataforma para programadores, animadores, designers e artistas 3d 
                procurarem vagas e se candidatarem a concursos feitos pelas empresas na plataforma para serem 
                escolhidos a posição desejada pela empresa</p>
                <br/>
                <br/>
                <Button title={'Começe'} to="/Cadastro" style={{height: '100px'}}/>
            </div>
        </div>
    )
}