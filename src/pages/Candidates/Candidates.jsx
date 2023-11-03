import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Header from '../../components/Header Companie'
import './Candidates.css'
import Button from '../../components/Button'
import config from "../URL";
const URLServidor = config.serverAddress

export default function Jobs(){
    const {companieId,companieName} = useParams()
    const [cargosEscolhido, setCargosEscolhido] = useState([])
    const [usuarios,setUsuarios] = useState([])

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`${URLServidor}/Candidatos`)
            const data = await response.json() 
            setUsuarios(data.dadosUsuarios)       
        };
        getData()
    },[cargosEscolhido])

    const addCargo = (value) => {
        setCargosEscolhido([...cargosEscolhido, value]);
      };
    
      // 3. Função para remover um valor do array.
    const removeCargo = (value) => {
        const updatedValues = cargosEscolhido.filter((item) => item !== value);
        setCargosEscolhido(updatedValues);
    };
    return(
        <>
            <Header/>
            <h1 id='candidatos-h1'>Candidatos</h1>
            <div className='painel-escolhas-candidatos'>
                <input className='opcoes-candidatos' type="checkbox" id="carreira1" name="carreira" value="Programador" onChange={(e) => {if(e.target.checked){addCargo(e.target.value)}else{removeCargo(e.target.value)}}}/>
                <label>Programador</label>
        
                <input className='opcoes-candidatos' type="checkbox" id="carreira2" name="carreira" value="Designer" onChange={(e) => {if(e.target.checked){addCargo(e.target.value)}else{removeCargo(e.target.value)}}}/>
                <label>Designer</label>
        
                <input className='opcoes-candidatos' type="checkbox" id="carreira3" name="carreira" value="Artista 3D" onChange={(e) => {if(e.target.checked){addCargo(e.target.value)}else{removeCargo(e.target.value)}}}/>
                <label>Artista 3D</label>
                
                <input className='opcoes-candidatos' type="checkbox" id="carreira4" name="carreira" value="Animador" onChange={(e) => {if(e.target.checked){addCargo(e.target.value)}else{removeCargo(e.target.value)}}}/>
                <label>Animador</label>
            </div>
            <section className="container-devs">
                {
                    usuarios.map((usuario,index)=>{
                            if(cargosEscolhido.includes(usuario.cargo)){
                                return (
                                <div className="usuarios-renderizados" key={index}>
                                    <p id="p4-nome-usuario">{usuario.nome}</p>
                                    <p id="p3-cargo-usuario">{usuario.cargo}</p>
                                    <p id="p2-telefone-usuario">Telefone: {usuario.telefone}</p>
                                    <p id="p1-email-usuario">Email: {usuario.email}</p>
                                    <Button to={`/Usuario/Empresa/${companieId}/${companieName}/Candidatos/${usuario.id_usuario}`} title={'Acesse'}></Button>
                                </div>)
                            }
                            
                    })
                }
            </section>
        </>
    )
}