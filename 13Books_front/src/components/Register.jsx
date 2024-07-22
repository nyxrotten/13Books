import { useState } from "react";
import logo from '../assets/imgs/13Books-logo.png';
import '../assets/CSS/login.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import { usePropertyContext } from "../context/PropertyContext";
import { register } from './users/users';

function Register() {

    const {setUser} = usePropertyContext();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {

        if (!username || !email || !password) {
            setMessage('Debes introducir datos correctos. Todos los campos son obligatorios!');
        }
        else {

            try {
                const dataRegister = await register(username, email, password);
                localStorage.setItem('login', JSON.stringify(dataRegister));
                console.log(dataRegister.user);
                
                setUser(dataRegister.user);
                setMessage(`Usuario ${dataRegister.user.username} registrado.`);
              } catch (error) {
                  setMessage('Usuario no registrado: el nombre del usuario o el email ya existe!');
                  console.log(error.message);
              }
        }
       
      };

    return(
        <>
        <header className='loginHeader'>
                <Link to={('/')}><img src={logo}/></Link>
                <div className='user'>
                <i class="fa-solid fa-user"></i>
                </div>
        </header>
        <nav className='logNav'>
            <div><Link className='reactLink' to={('/')}>< i class="fa-solid fa-house"/></Link></div>
            <div><p>Registro</p></div>
        </nav>
        <main>
            <div className='logMain'>
                <div className='logName'>
                    <label>Nombre usuario</label>
                    <input
                        type="text"
                        placeholder="Nombre del usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='logName'>
                    <label>Email usuario</label>
                    <input
                        type="text"
                        placeholder="Email del usuario"
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
                    <button className='regReg' onClick={handleRegister}>Registrarse</button>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Register;