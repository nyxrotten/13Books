import '../../assets/CSS/editpage.css';
import Header from '../Header';
import Footer from '../Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

function EditPage() {
   
    const genres = [
        { value: 1, label: 'No-Ficción' },
        { value: 2, label: 'Fantasía' },
        { value: 3, label: 'Histórica' },
        { value: 4, label: 'Romántica' },
        { value: 5, label: 'Terror' },
        { value: 6, label: 'Novela Negra' },
        { value: 7, label: 'Poesía' },
        { value: 8, label: 'Cómic' },
        { value: 9, label: 'Ciencia Ficción' },
      ];

    const languages = [
        { value: 'Español', label: 'Español' },
        { value: 'English', label: 'Inglés' },
        { value: '', label: 'Selecciona idioma' } 
    ];

    const fechaFormateada = (date) => {
        if (!date) return '';
        if (typeof date === 'string') return date.split('T')[0];
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${d.getFullYear()}-${month}-${day}`;
      };

    const {
        register,
        handleSubmit,
        reset,
        setValue, 
        formState: { errors },
      } = useForm();

    const { id } = useParams();
    const [error, setError] = useState('');
    const [book, setBook] = useState({});
    const { post, put, remove } = useRequest();
    const {books} = useBooksContext();
    const navigate = useNavigate();
    const [isFirstTime, setIsFirstTime] = useState(true);
    

    const doCreateUpdate = async (data) => {
       
        try {
            if (book && id) {
                const response = await put(`${book.bookid}`, data);
                setBook(response.book);
                alert('El libro se ha actualizado correctamente!');
            } else {
                const response = await post(data, 'books');
                 setBook(response.book);
                alert('El libro se ha creado correctamente!'); 
            }
    
            setError('');
            navigate('/');
        } catch (error) {
            console.log(error.message);
            setError('No se han podido actualizar los datos del libro. Inténtalo más tarde.');
        }
    };

    const doDelete = async () => {
        if (book.bookid > 0)
        {
            if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
                try {
                    const response = await remove(`${book.bookid}`);
                    alert('El libro se ha eliminado correctamente!');
                    navigate('/'); 
                } catch (error) {
                    console.log(error.message);
                    setError('No se ha podido eliminar el libro. Inténtalo más tarde.');
                }
            }
        }
    }

    useEffect(() => {
      
        if (books && id && isFirstTime) {
            const myBook = books.filter((book) => book.bookid === parseInt(id))[0];
            setBook(myBook);
            setIsFirstTime(false);
        }  

        if (book) {
            
           // console.log(book);
            setValue('title', book.title || '');
            setValue('author', book.author || '');
            setValue('isbn', book.isbn || '');
            setValue('editorial', book.editorial || '');
            setValue('language', book.language || '');
            setValue('publication_date',  fechaFormateada(book.publication_date));
            setValue('price', book.price || 0);
            setValue('genreid', book.genreid || '1');
            setValue('stock', book.stock || '1');
            setValue('image', book.image || '');
            setValue('summary', book.summary || '');
        }
        else {
            reset();
        }

          // Si no hay libros es que hemos recargado la página incorrectamente y redirigimos al home
       /* if (books && books.length <= 0){
             navigate('/');
        }*/
        
      }, [book]);

    return (
        <>
        <Header />
        <div className="editBox">
        <div className="errorMessage">{error && <p>{error}</p>}</div>
            <form onSubmit={handleSubmit(doCreateUpdate)}>
                <input type="hidden" {...register('bookid')} />
               
                    <label>Título</label>
                    <input type ="text" {...register("title", { required: true })} />
                    {errors.title && <p className='errorInput'>El título es obligatorio</p>}
               
                
                    <label>Autor</label>
                    <input type ="text" {...register("author")} />
                
                    <label>ISBN</label>
                    <input type ="text" {...register("isbn", { required: true })} max='20'/>
                    {errors.isbn && <p className='errorInput'>El ISBN es obligatorio</p>}
               
                    <label>Editorial</label>
                    <input type ="text" {...register("editorial")} />
              
                    <label>Idioma </label>
                    <select {...register('language')}>
                        {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                        ))}
                    </select>
                
                    <label>Fecha Publicacion</label>
                    <input type ="date" {...register("publication_date", {valueAsDate: true})} />
              
                    <label>Precio en €</label>
                    <input type ="number"  step="0.01" {...register("price", { required: true })} min='1'/>
                    {errors.price && <p className='errorInput'>El precio es obligatorio</p>}
             
                    <label>Género</label>
                    <select {...register('genreid', { required: true })}>
                        {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                            {genre.label}
                        </option>
                        ))}
                    </select>
                    {errors.genreid && <p className='errorInput'>El género es obligatorio</p>}
             
                    <label type="url">Imagen</label>
                    <input type ="url" {...register("image")} />
            
                    <label>Unidades</label>
                    <input type ="number" {...register("stock", { required: true })} min='1' />
                    {errors.stock && <p className='errorInput'>El stock es 1 como mínimo</p>}
             
                    <label>Resumen</label>
                    <input type ="textarea" {...register("summary", { required: true })} />
                    {errors.summary && <p className='errorInput'>El Resumen es obligatorio</p>}
                
                <div className='editBoxButtons'>
                    <button type="button" onClick={() => navigate('/')}>Cancelar</button>
                    <button type="button" onClick={doDelete}>Borrar libro</button>
                    <button type="submit" className='enviarButton'>Guardar</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default EditPage;

