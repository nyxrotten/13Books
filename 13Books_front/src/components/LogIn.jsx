import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../assets/CSS/header.css';
import '../assets/CSS/loginRegister.css';
import logo from '../assets/imgs/13Books-logo.png';
import Footer from './Footer';

import { useBooksContext } from '../context/BooksContext';
import useRequestUsers from '../hooks/useRequestUsers';

function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {setUser} = useBooksContext();
    const navigate = useNavigate();
    const { login } = useRequestUsers();

    const doLogin = async () => {
        try {
            const dataLogin = await login(email, password);
            localStorage.setItem('login', JSON.stringify(dataLogin));
           
            console.log(dataLogin.user);
            setUser(dataLogin.user);
            setMessage(`Bienvenid@ ${dataLogin.user.username}`);
            navigate('/');
        } catch (error) {
            setMessage('¡Usuario no registrado o credenciales incorrectas!');
            console.log(error.message);
        }
      };


    return(
        <>
        <header className='loginHeader'>
                <Link to={('/')}><img src={logo}/></Link>
                <div className='user'>
                <i className="fa-solid fa-user"/>
                </div>
        </header>
        <nav className='logNav'>
            <div><Link className='reactLink' to={('/')}><i className="fa-solid fa-house"/></Link></div>
            <div><p>Login</p></div>
        </nav>
        <main>
            <div className='logMain'>
            <div className="errorMessage">{message && <p>{message}</p>}</div>
                <div className='logName'>
                    <label>Email usuario</label>
                    <input
                        type="text"
                        placeholder="Email usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='logPass'>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='logButt'>
                    <button className='logEnt' onClick={doLogin}>Iniciar Sesión</button>
                    <button className='logReg'><Link className='reactLink' to={('/register')}>Registrarse</Link></button>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default LogIn;
