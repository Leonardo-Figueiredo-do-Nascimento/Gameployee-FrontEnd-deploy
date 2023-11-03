import Header from "../../components/Header Companie";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import "./User.css"
import config from "../URL";
const URLServidor = config.serverAddress

export default function User_Dev(){
  
    const {devId} = useParams()
    const [dados,setDados] = useState([])
    const [telefone,setTelefone] = useState('')
    const [trabalhos,setTrabalhos] = useState([])  

    useEffect(() => {
        async function getData(){
            const response = await fetch(`${URLServidor}/Dados_Candidato/${devId}`);
            const data = await response.json()
            setDados(data.dadosUsuario[0])
        }
        getData()
    }, []);

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Telefone/${devId}`);
            const data = await response.json()
            console.log(data);
            setTelefone(data.telefone[0].telefone)
        }
        getData()
    },[])

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Trabalhos_usuario/${devId}`);
            const data = await response.json()
            console.log(data);
            console.log(data.dadosTrabalhos);
            setTrabalhos(data.dadosTrabalhos)
        }
        getData()
    },[])

    return(
        <>
            <Header/>
            <h1 id="cp-nome-usuario">{dados.nome}</h1>
            <h2 id="cp-cargo">Ocupação: {dados.cargo}</h2>
            <h2 id="cp-email-dev">Email: {dados.email}</h2>
            <h2 id="cp-telefone">Telefone: {dados.telefone}</h2>
            <div className="cp-dev-container">
                <p className="cp-dev-content">Trabalhos:</p>
                <div className="cp-trabalhos">
                    {
                        trabalhos.length > 0 ? (
                            trabalhos.map((trabalho, index) => (
                                <div className="cp-trabalho" key={index}>
                                    <div className="cp-trabalho-renderizado" >
                                        <p id={'cp-titulo-trabalho'}>{trabalho.titulo}</p>
                                    </div>
                                    <div className="cp-bt_opcoesTrabalho">
                                        <a target={"_blank"} href={trabalho.trabalho_link} id="cp-bt_linkTrabalho">Acessar Trabalho</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum trabalho postado ainda.</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}