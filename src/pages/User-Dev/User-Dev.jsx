import Header from "../../components/Header User";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from 'axios'
import "./User.css"
import config from "../URL";
const URLServidor = config.serverAddress

export default function User_Dev(){
  
    const {devId, devName, devCargo} = useParams()
    const [newArt, setNewArt] = useState(false);
    const [titulo,setTitulo] = useState()
    const [link,setLink] = useState('')
    const [telefone,setTelefone] = useState('')
    const [trabalho,setTrabalho] = useState() 
    const [trabalhos,setTrabalhos] = useState([])  

    useEffect(() => {
        setTrabalho({
                    titulo: titulo,
                    trabalho_link: link
        }
    )}, [titulo,link]);

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

    const mudarTelefone = async (e) =>{
        e.preventDefault()
        const novoTelefone = prompt("Digite o novo numero de telefone pra contato")
        axios.patch(`${URLServidor}/Mudar_Telefone/${devId}/${novoTelefone}`)
        .then((res) => {
            console.log(res.message)
        })
        .catch((err) => console.error(err));

        window.location.reload()
    }

    const excluirTrabalho = async (e,id_trabalho) =>{
        e.preventDefault()
        const exclusão = confirm("Quer mesmo excluir esse trabalho?")
        if(exclusão){

            axios.delete(`${URLServidor}/Deletar_Trabalho/${id_trabalho}`)
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

        axios.post(`${URLServidor}/Postar_Trabalho/${devId}`,trabalho)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.error(err));
        
        window.location.reload()
    }

    return(
        <>
            <Header/>
            <h1 id="nome-usuario">{devName}</h1>
            <h2 id="cargo">Ocupação: {devCargo}</h2>
            <span style={{display:'flex',flexDirection:'row',height:'auto',width:'auto'}}>
                <h2 id="telefone">Telefone: {telefone}</h2>
                <button onClick={mudarTelefone} id='bt-telefone'>Mudar telefone</button>
            </span>
            <div className="dev-container">
                <p className="dev-content">Seus Trabalhos:</p>
                <div className="trabalhos">
                    {
                        trabalhos.length > 0 ? (
                            trabalhos.map((trabalho, index) => (
                                <div className="trabalho" key={index}>
                                    <div className="trabalho-renderizado" >
                                        <p id={'titulo-trabalho'}>{trabalho.titulo}</p>
                                    </div>
                                    <div className="bt_opcoesTrabalho">
                                        <a target={"_blank"} href={trabalho.trabalho_link} id="bt_linkTrabalho">Acessar Trabalho</a>
                                        <button id="botão-exclusão" onClick={(e)=>excluirTrabalho(e,trabalho.id_trabalho)}>Excluir</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum trabalho postado ainda.</p>
                        )
                    }
                </div>
                

                <button onClick={()=>setNewArt(!newArt)} id={'bt-addTrabalho'}>Novo Trabalho</button>

                {newArt && (
                    <form onSubmit={postarTrabalho} className={'artForm'}>
                        <div className={'artForm'}>
                            <label className="label_trabalho">Titulo do seu trabalho:</label>
                            <input type="text" maxLength={80} onChange={(e) => setTitulo(e.target.value)}/> <br/>
                            <label className="label_trabalho">Link do seu trabalho:</label>
                            <input type="text" onChange={(e) => setLink(e.target.value)}/> <br/>
                            <input type={'submit'} value='Publicar'/>
                        </div>
                    </form>
                )}
            </div>
            
        </>
    )
}