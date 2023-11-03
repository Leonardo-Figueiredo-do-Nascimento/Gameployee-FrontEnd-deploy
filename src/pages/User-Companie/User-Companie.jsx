import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header Companie";
import './Companie.css'
import axios from 'axios'
import Button from "../../components/Button";
import config from "../URL";
const URLServidor = config.serverAddress

export default function User_Companie(){

    const {companieId, companieName} = useParams()
    const [addVaga,setAddVaga] = useState(false)
    const [addConcurso,setAddConcurso] = useState(false)
    const [titulo,setTItulo] = useState()
    const [cargo,setCargo] = useState()
    const [descrição,setDescrição] = useState()
    const [escolha,setEscolha] = useState()
    const [vaga,setVaga] = useState()
    const [concurso,setConcurso] = useState()
    const [concursos,setConcursos] = useState([])
    const [vagas,setVagas] = useState([])

    useEffect(() => {
        if(escolha=='vaga'){
            setVaga(()=> {
                return{
                    vaga:{
                        titulo: titulo,
                        cargo: cargo,
                        descrição: descrição,
                        nome_empresa: companieName
                    }}})}
        if(escolha=='concurso'){
            setConcurso(()=>{
                return{
                    concurso:{
                        titulo: titulo,
                        cargo: cargo,
                        descrição: descrição,
                        nome_empresa: companieName
                    }
            }})
        }},[titulo,cargo,descrição,companieName]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Concursos_da_empresa/${companieName}`)
            const data = await response.json() 
            console.log(data.dadosConcursos)
            setConcursos(data.dadosConcursos)       
        };
        getData()
    },[])
    
    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Vagas_da_empresa/${companieName}`)
            const data = await response.json() 
            setVagas(data.dadosVagas)       
        };
        getData()
    },[])
    
    useEffect(()=>{
        console.log(vagas)
    },[vagas])

    const postarVaga = async (e) => {
        e.preventDefault()
        if(escolha == 'vaga'){
            axios.post(`${URLServidor}/Postar_Vaga`,vaga)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error(error)) 
            window.location.reload()
        }
        if(escolha == 'concurso'){
            axios.post(`${URLServidor}/Postar_Concurso`,concurso)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error(error))
            window.location.reload()
        }
        setAddVaga(false)
        setVaga()
    }
    const excluirConcurso = async (e,id_concurso) =>{
        e.preventDefault()
        const exclusão = confirm("Quer mesmo finalizar esse concurso?")
        if(exclusão){
            axios.delete(`${URLServidor}/Deletar_Concurso/${id_concurso}`)
            .then((res) => {
                console.log(res.message)
            })
            .catch((err) => console.error(err));
            window.location.reload()
        } else{
            return;
    }}
    const excluirVaga = async (e,id_vaga) =>{
        e.preventDefault()
        const exclusão = confirm("Quer mesmo finalizar essa vaga?")
        if(exclusão){
            axios.delete(`${URLServidor}/Deletar_Vaga/${id_vaga}`)
            .then((res) => {
                console.log(res.message)
            })
            .catch((err) => console.error(err));
            window.location.reload()
        } else{
            return;
        }
    }
    return(
        <>
            <Header/>
            <h1 id="nome-empresa">{companieName}</h1>
            <div className="empresa-container">
                <p className="visible-elements">Suas vagas e concursos:</p>
                <section className="painel-vagas">
                    {
                        concursos.map((concurso,index)=>{
                            return (
                            <div id='concurso' key={index}>    
                                <div className="concurso-renderizado">
                                    <p id="p-titulo-concurso">{concurso.titulo_concurso}</p>
                                    <p id="p-cargo-concurso">{concurso.cargo}</p>
                                    <p id="p-descricao-concurso">{concurso.descrição}</p>
                                </div>
                                <div className="bt_opcoesConcurso">
                                        <Button id='bt_candidatos' title='Candidatos' to={`/Usuario/Empresa/${companieId}/${companieName}/Concurso/${concurso.id_concurso}/${concurso.titulo_concurso}`}></Button>
                                        <button id="botão-exclusão" onClick={(e)=>excluirConcurso(e,concurso.id_concurso)}>Finalizar</button>
                                </div>
                            </div>)
                        })
                    }
                    {   
                        vagas.map((vaga,index)=>{
                            return (
                            <div id='vaga' key={index}>
                                <div className="vaga-renderizada" >
                                    <p id="p-titulo-vaga">{vaga.titulo}</p>
                                    <p id="p-cargo-vaga">{vaga.cargo}</p>
                                    <p id="p-descricao-vaga">{vaga.descrição}</p>
                                </div>
                                <div className="bt_opcoesConcurso">
                                    <button id="botão-exclusão" onClick={(e)=>excluirVaga(e,vaga.id_vaga)}>Finalizar</button>
                                </div>
                            </div>)
                        })
                    }
                </section>
                <div id="bts-add">
                    <button className="visible-elements" onClick={() => {setAddVaga(!addVaga);setAddConcurso(false); setEscolha('vaga')}}>Adicionar Vaga</button>
                    <button className="visible-elements" onClick={() => {setAddVaga(false);setAddConcurso(!addConcurso); setEscolha('concurso')}}>Adicionar Concurso</button>
                </div>
                {addVaga || addConcurso ? (
                    <>
                        <form onSubmit={postarVaga}>
                            <label>Titulo:</label>
                            <input type={"text"} onChange={(e)=> setTItulo(e.target.value)} required/>
                            <label>Cargo</label>
                            <div className='carreiras'>
                            <input type="radio" id="carreira1" name="carreira" value="Programador" onChange={(e)=> setCargo("Programador")} required/>
                                <label>Programador</label>
                        
                                <input type="radio" id="carreira2" name="carreira" value="Designer" onChange={(e)=> setCargo("Designer")}/>
                                <label>Designer</label>
                        
                                <input type="radio" id="carreira3" name="carreira" value="Artista 3D" onChange={(e)=> setCargo("Artista 3D")}/>
                                <label>Artista 3D</label>
                                
                                <input type="radio" id="carreira4" name="carreira" value="Animador" onChange={(e)=> setCargo("Animador")}/>
                                <label>Animador</label>
                            </div>
                            <label>Descrição:</label>
                            <input id='input-descrição' type={"text"} onChange={(e)=> setDescrição(e.target.value)} required/>
                            <input type="submit" value="Postar" />
                        </form>
                    </>
                ) : null}
            </div>
        </>
    )
}