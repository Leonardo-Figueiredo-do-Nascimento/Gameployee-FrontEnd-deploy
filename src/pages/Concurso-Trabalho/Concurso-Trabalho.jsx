import Header from "../../components/Header User";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from 'axios'
import "./User.css"
import config from "../URL";
const URLServidor = config.serverAddress

export default function User_Dev(){
    
    const {devId,idConcurso} = useParams()
    const [dadosConcurso,setDadosConcurso] = useState({titulo: '',cargo: '',descrição: ''})
    const [titulo,setTitulo] = useState()
    const [link,setLink] = useState('')
    const [trabalho,setTrabalho] = useState() 
    const [trabalhos,setTrabalhos] = useState([])  

    useEffect(() => {
        setTrabalho({
            id_usuario:devId,
            titulo: titulo,
            trabalho_link: link,
            id_concurso: idConcurso
        }
    )}, [titulo,link]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Trabalho_usuario_concurso/${devId}/${idConcurso}`);
            const data = await response.json()
            console.log(data);
            console.log(data.dadosTrabalho);
            setTrabalhos(data.dadosTrabalho)
        }
        getData()
    },[])

    useEffect(()=>{
        async function getDadosConcurso(){
            const response = await axios.get(`${URLServidor}/Dados_Concurso/${idConcurso}`)
            const data = await response.data.dadosConcurso[0]
            console.log(data)
            setDadosConcurso({
                id_concurso: data.id_concurso,
                titulo: data.titulo_concurso,
                cargo: data.cargo,
                descrição: data.descrição
            })
        }
        getDadosConcurso()
    },[])

    const excluirTrabalho = async (e) =>{
        e.preventDefault()
        const exclusão = confirm("Quer mesmo excluir esse trabalho?")
        if(exclusão){

            axios.delete(`${URLServidor}/Deletar_Trabalho_Concurso/${idConcurso}/${devId}`)
            .then((res) => {
                console.log(res.message)
            })
            .catch((err) => console.error(err));

            window.location.reload()
        } else{
            return;
        }
    }

    const postarTrabalho = async (e) =>{

        e.preventDefault()

        axios.post(`${URLServidor}/Postar_Trabalho_Concurso/${devId}`,trabalho)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.error(err));
        console.log(trabalho)
        window.location.reload()
    }

    return(
        <>
            <Header/>
            <h1 id="titulo-concurso">{dadosConcurso.titulo}</h1>
            <h2 id="descricao">{dadosConcurso.descrição}</h2>
            <div className="dev-container">
                <p className="dev-content">Poste seu trabalho e dispute com outros desenvolvedores:</p>
                <div className="trabalhos">
                    {
                        trabalhos.length > 0 ? (
                            trabalhos.map((trabalho, index) => (
                                <div className="trabalho" key={index}>
                                    <div className="trabalho-c-renderizado" >
                                        <p id={'titulo-trabalho'}>{trabalho.titulo}</p>
                                    </div>
                                    <div className="bt_opcoesTrabalho">
                                        <a target={"_blank"} href={trabalho.trabalho_link} id="bt_linkTrabalho">Acessar Trabalho</a>
                                        <button id="botão-exclusão" onClick={(e)=>excluirTrabalho(e)}>Excluir</button>
                                    </div>
                                </div>
                            ))
                        ) : (                 
                            <p>Nenhum trabalho postado ainda.</p>
                        )
                    }
                </div>

                {
                    trabalhos.length === 0 ? (
                    <form onSubmit={postarTrabalho} className={'artForm'}>
                        <div className={'artForm'}>
                            <label className="label_trabalho">Titulo do seu trabalho:</label>
                            <input type="text" maxLength={80} onChange={(e) => setTitulo(e.target.value)}/> <br/>
                            <label className="label_trabalho">Link do seu trabalho:</label>
                            <input type="text" onChange={(e) => setLink(e.target.value)}/> <br/>
                            <input type={'submit'} value='Publicar'/>
                        </div>
                    </form>
                ):(<p style={{marginLeft:"30%",width:"auto"}}>Trabalho enviado, aguarde a avaliação da empresa.</p>)}
            </div>
        </>
    )
}