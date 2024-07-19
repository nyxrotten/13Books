import Footer from './Footer';
import logo from '../assets/imgs/13Books-logo.png';
import { Link } from 'react-router-dom';
import  '../assets/CSS/singleProduct.css';

function SingleProduct(){

    return(
        <>
            <header className='singleProductHeader'>
                <img src={logo}/>
                <div className='log'>
                    <button className='logHome'> <Link className='reactLink' to={('/login')}>LogIn</Link></button>
                    <button className='logHome'><Link className='reactLink'to={('/register')}>Registro</Link></button>
                </div>
            </header>
            <nav className='breadCrumbs'></nav>
            <main>
                <div>
                    <img/>
                </div>
                <div>
                    <h2>El Señor de los Anillos: La comunidad del Anillo</h2>
                    <h3>J.R.R. Tolkien</h3>
                    <h4>ISBN 978844501805</h4>
                    <p>La primera entrega de la trilogía de J. R. R. Tolkien El Señor de los Anillos. Empieza tu viaje a la Tierra Media. Edición revisada. Un héroe inesperado. Una misión peligrosa. La
                        mayor aventura que jamás te hayan contado. En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción
                        en la Grieta del Destino. Acompañado por magos, hombres, elfos y enanos, atravesará la Tierra Media y se internará en las sombras de Mordor, perseguido siempre por las huestes de
                        Sauron, el Señor Oscuro, dispuesto a recuperar su creación para establecer el dominio definitivo del Mal.</p>
                    <section>
                        <div>
                            <p>Fantástica</p>
                        </div>
                        <div>
                            <p>J.R.R. Tolkien</p>
                        </div>
                    </section>
                    <section>
                        <h3>12.95€</h3>
                    </section>
                </div>
            </main>
        
            <Footer />
        </>
    )

}

export default SingleProduct;