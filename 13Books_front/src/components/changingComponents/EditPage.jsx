import '../../assets/CSS/editpage.css';
import Header from '../Header';
import Footer from '../Footer';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';


function EditPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useBooksContext();
    const { post, put } = useRequest();
    const {book, setBook} = useBooksContext();

    //const dataBook = { title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary };
     

    const doCreate = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(urlApi);
    
          setError('');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Tu sesión ha expirado. Redirigiendo al inicio...');
        
                localStorage.removeItem('login');
                setUser({});
                navigate('/');
              }
              else {
                console.log(err.message);
                setError('No se han encontrado libros para esta búsqueda.');
        
              }
        
        }
      };

    

    return (
        <>
        <Header />
        <div className="editBox">
            <div>
                <label type="text">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label type="text">Autor</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
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
                <button onClick={doCreate}>Guardar</button>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default EditPage;