import {Link} from 'react-router-dom'
import Header from '../../components/Header/index.jsx'
import './Register.css'
import { useState , useEffect } from 'react'
import config from "../URL";
const URLServidor = config.serverAddress

export default function Register(){

    //State visual
    const [dev,setDev] = useState(false)
    const [companie,setCompanie] = useState(false)
    //State dos dados
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [cargo,setCargo] = useState('')
    const [senha,setSenha] = useState('')
    const [telefone,setTelefone] = useState('')
    const [dados,setDados] = useState({})
    
    useEffect(() => {
        setDados(() => {
          if (dev || companie) {
            if (dev) {
              return {
                usuario: {
                    nome: nome,
                    email: email,
                    senha: senha,
                    cargo: cargo,
                    telefone: telefone
                },
              };
            } else {
              return {
                empresa: {
                    nome: nome,
                    email: email,
                    senha: senha
                },
              };
            }
          }
        });
    }, [dev, companie, email, nome, senha,cargo,telefone]);

    const cadastrar = async (e) => {
        e.preventDefault()
    
        if(dev == true && nome != '' && email != '' && senha != '' && cargo != '' && telefone != ''){

            const dadosUsuario = JSON.stringify(dados)

            console.log(dadosUsuario)

        } else if(companie && nome != '' && email != '' && senha != ''){
           
            const dadosEmpresa = JSON.stringify(dados)

            console.log(dadosEmpresa)

        }else{
            alert('Preencha os dados para se cadastrar')
            return;
        }

        try {
            const response = await fetch(`${URLServidor}/Cadastro`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
      
            const dadosResposta = await response.json()
            
            if (response.status===200) {
                console.log('Dados enviados com sucesso!');
                if(dadosResposta.usuario){
                    window.location.href = `/Usuario/Desenvolvedor/${dadosResposta.id}/${dadosResposta.nome}/${dadosResposta.cargo}`
                } else if(dadosResposta.empresa){
                    window.location.href = `/Usuario/Empresa/${dadosResposta.id}/${dadosResposta.nome}`
                }
            } else if(response.status===409){
              alert('Usuario e email invalidos ou já existentes');
            }

            } catch (error) {
              console.error('Erro ao enviar os dados:', error);
            }
    }

    return(
        <>
            <Header/>
            <h3>Cadastre-se</h3>
            <div className='registro'>
                <div className='perfis'>
                    <input type="radio" id="dev" value={dev} name="perfil" onChange={() => {
                        setDev(true); setCompanie(false)
                    }} required/>
                    <label>Desenvolvedor</label>
                    <input type="radio" id="companie" value={companie} name="perfil" onChange={() => {
                        setCompanie(true); setDev(false)
                    }}/>
                    <label>Empresa</label>
                </div>
                <form onSubmit={cadastrar}>
                    <label>Nome:</label>
                    <input type='text' id='name' value={nome} onChange={(e)=> setNome(e.target.value)}></input>
                    <label>E-mail:</label>
                    <input type="email" id="email" placeholder="seuemail@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <label>Senha:</label>
                    <input type="text" id="password" value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                    
                    {dev && !companie ? (
                        <>
                            <h id='h3Area'>Sua área de atuação: </h>
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
                            <label>Telefone:</label>
                            <input type={'text'} id='cellnumber' maxLength={20} value={telefone} onChange={(e)=> setTelefone(e.target.value)}></input>
                        </>
                    ) : null}

                    <input type="submit" value="Finalizar Cadastro"/>
                </form>
            </div>
        </>
    )
}