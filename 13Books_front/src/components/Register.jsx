import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../assets/CSS/loginRegister.css';
import logo from '../assets/imgs/13Books-logo.png';
import Footer from './Footer';

import { usePropertyContext } from "../context/PropertyContext";
import { register } from './users/usersapi';

function Register() {

    const {setUser} = usePropertyContext();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {

        if (!name || !surname || !city || !username || !email || !password) {
            setMessage('Debes introducir datos correctos. ¡Todos los campos son obligatorios!');
        }
        else {

            try {
                const dataRegister = await register(name, surname, city, username, email, password);
                localStorage.setItem('login', JSON.stringify(dataRegister));
                console.log(dataRegister.user);
                
                setUser(dataRegister.user);
                setMessage(`Usuario ${dataRegister.user.username} registrado.`);
                navigate('/');
            } catch (error) {
                setMessage('Usuario no registrado: el nombre del usuario o el email ya existe!');
                console.log(error.message);          }
        }

    };

    return(
        <>
        <header className='loginHeader'>
                <Link to={('/')}><img src={logo}/></Link>
                <div className='user'>
                <i className="fa-solid fa-user"></i>
                </div>
        </header>
        <nav className='logNav'>
            <div><Link className='reactLink' to={('/')}>< i className="fa-solid fa-house"/></Link></div>
            <div><p>Registro</p></div>
        </nav>
        <main>
            <div className='logMain'>
                <div className="errorMessage">{message && <p>{message}</p>}</div>
                <div className='logName'>
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre del usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='logName'>
                    <label>Apellido</label>
                    <input
                        type="text"
                        placeholder="Apellido del usuario"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className='logName'>
                    <label>Ciudad</label>
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className='logName'>
                    <label>Alias usuario</label>
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
                        type="email"
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
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Register;