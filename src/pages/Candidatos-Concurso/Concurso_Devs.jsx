import Header from "../../components/Header Companie";
import { useParams,Link } from "react-router-dom";
import { useState , useEffect } from "react";
import "./User.css"
import config from "../URL";
const URLServidor = config.serverAddress

export default function User_Dev(){
  
    const {companieId,companieName,idConcurso,concursoName} = useParams()
    const [dados,setDados] = useState([])

    useEffect(() => {
        async function getData(){
            const response = await fetch(`${URLServidor}/Dados_Participantes_Concurso/${idConcurso}`);
            const data = await response.json()
            console.log(data)
            console.log(data.dadosParticipantes[0])
            console.log(data.dadosParticipantes)
            setDados(data.dadosParticipantes)
        }
        getData()
    }, []);
    

    return(
        <>
            <Header/>
            <h1 id="cn-titulo-concurso">{concursoName}</h1>
            <div className="cp-dev-container">
                <p className="cp-dev-content">Candidatos:</p>
                <div className="cp-trabalhos">
                    {
                        dados.length > 0 ? (
                            dados.map((dado, index) => (
                            <>
                                <div id='nome-participante'>
                                    <Link to={`/Usuario/Empresa/${companieId}/${companieName}/Candidatos/${dado.id_usuario}`} id='cp-nome'>{dado.nome}</Link>
                                </div>
                                <div className="cp-trabalho" key={index}>
                                    <div className="cp-trabalho-renderizado" >
                                        <p id={'cp-titulo-trabalho'}>{dado.titulo}</p>
                                    </div>
                                    <div className="cp-participante-renderizado" >
                                        <p id={'cp-email-participante'}>Email: {dado.email}</p>
                                        <p id={'cp-telefone-participante'}>Telefone: {dado.telefone}</p>
                                    </div>
                                    <div className="cp-bt_opcoesTrabalho-concurso">
                                        <a target={"_blank"} href={dado.trabalho_link} id="cp-bt_linkTrabalho">Acessar Trabalho</a>
                                    </div>
                                </div>
                            </>
                            ))
                        ) : (
                            <p>Nenhum candidato ainda.</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}