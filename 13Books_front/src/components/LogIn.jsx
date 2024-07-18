import logo from '../assets/imgs/13Books-logo.png';
import '../assets/CSS/login.css';
import { Link } from 'react-router-dom';
import Footer from './Footer'

function LogIn() {

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
            <div><p>Login</p></div>
        </nav>
        <main>
            <div className='logMain'>
                <div className='logName'>
                    <label>Nombre de usuario</label>
                    <input />
                </div>
                <div className='logPass'>
                    <label>Contraseña</label>
                    <input />
                </div>
                <div className='logButt'>
                    <button className='logEnt'>ENTRAR</button>
                    <button clasNamge='logReg'><Link className='reactLink' to={('/register')}>Registrarse</Link></button>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default LogIn;