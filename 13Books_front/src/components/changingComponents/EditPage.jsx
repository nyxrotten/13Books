import '../../assets/CSS/editpage.css';
import Header from '../Header';
import Footer from '../Footer';


function EditPage() {

    return (
        <>
        <Header />
        <div className="editBox">
            <div>
                <label type="text">Título</label>
                <input />
            </div>
            <div>
                <label type="text">Autor</label>
                <input />
            </div>
            <div>
                <label type="text">ISBN</label>
                <input />
            </div>
            <div>
                <label type="text">Género</label>
                <input />
            </div>
            <div>
                <label type="url">Imagen</label>
                <input />
            </div>
            <div>
                <label type="number">Unidades</label>
                <input />
            </div>
            <div>
                <label type="number">Precio</label>
                <input />
            </div>
            <div className='editBoxButtons'>
                <button>Cancelar</button>
                <button>Borrar</button>
                <button>Guardar</button>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default EditPage;