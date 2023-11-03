import "./Companies.css"
import Button from '../../components/Button'
import Header from '../../components/Header/index.jsx'

export default function Companies(){
    return(
        <div className='container'>
            <Header/>
            <div className="content">
                <h2>Empresas</h2>
                <br/>
                <br/>
                <p>Cadastre a sua empresa hoje mesmo e entre em contato com desenvolvedores qualificados pra sua 
                empresa poder desenvolver jogos de qualidade,sua empresa também pode criar concursos para 
                desenvolvedores se candidatarem para mostrar seus trabalhos e assim poder avaliar qual candidato 
                condiz com o que sua empresa busca.</p>
                <br/>
                <br/>
                <p>Nota: O Gameployee é uma plataforma de anuncio de vagas e conexão de desenvolvedores com empresas, 
                a plataforma não tem a função de administrar os funcionarios da sua empresa ou de qualquer 
                forma de administração.</p>
                <br/>
                <br/>
                <Button title={'Começe'} to="/Cadastro" />
            </div>
        </div>
    )
}