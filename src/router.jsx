import {createBrowserRouter} from 'react-router-dom'
import Companies from './pages/Companies/Companies'
import Developers from './pages/Developers/Developers'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Jobs from './pages/Jobs/Jobs'
import User_Dev from './pages/User-Dev/User-Dev'
import User_Companie from './pages/User-Companie/User-Companie'
import Candidates from './pages/Candidates/Candidates'
import Companie_Dev from './pages/Candidatos da vaga/Companie_Dev'
import Concurso_Devs from './pages/Candidatos-Concurso/Concurso_Devs'
import Concurso_Trabalho from './pages/Concurso-Trabalho/Concurso-Trabalho'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/Empresas",
        element: <Companies/>
    },
    {
        path: "/Desenvolvedores",
        element: <Developers/>
    },
    {
        path: "/Login",
        element: <Login/>
    },
    {
        path: "/Cadastro",
        element: <Register/>
    },
    {
        path: "/Usuario/Desenvolvedor/:devId/:devName/:devCargo/Vagas",
        element: <Jobs/>
    },
    {
        path: "/Usuario/Desenvolvedor/:devId/:devName/:devCargo",
        element: <User_Dev/>
    },
    {
        path: "/Usuario/Empresa/:companieId/:companieName",
        element: <User_Companie/>
    },
    {
        path:"/Usuario/Empresa/:companieId/:companieName/Candidatos",
        element: <Candidates/>
    },
    {
        path:"/Usuario/Empresa/:companieId/:companieName/Candidatos/:devId",
        element: <Companie_Dev/>
    },
    {
        path:"/Usuario/Empresa/:companieId/:companieName/Concurso/:idConcurso/:concursoName",
        element: <Concurso_Devs/>
    },
    {
        path:"/Usuario/Desenvolvedor/:devId/:devName/Concurso/:idConcurso",
        element: <Concurso_Trabalho/>
    }
])

export default router