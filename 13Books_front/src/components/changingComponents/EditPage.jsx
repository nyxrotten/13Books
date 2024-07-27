import '../../assets/CSS/editpage.css';
import Header from '../Header';
import Footer from '../Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksContext } from '../../context/BooksContext';
import useRequest from '../../hooks/useRequest';
import { useForm } from 'react-hook-form';


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
    const { post, put } = useRequest();
    const {books} = useBooksContext();
    

    const doCreateUpdate = async (data) => {
        alert('estoy en doCreateUpdate ');

        console.log(data);
        try {
            console.log(book);
            if (book) {
                const response = await put(`${book.bookid}`, data);
                alert('El libro se ha creado correctamente!');
            } else {
                const response = await post(`${book.bookid}`, data);
                alert('El libro se ha modificado correctamente!'); 
            }
            setBook(data);
            setError('');
        } catch (error) {
            console.log(error.message);
            setError('No se han podido actualizar los datos del libro. Inténtalo más tarde.');
        }
    };

    useEffect(() => {
        console.log('en edit page');
        console.log(books);
        if (books) {
            const myBook = books.filter((book) => book.bookid === parseInt(id))[0];
            console.log(myBook);
            if (myBook) {
              setBook(myBook);
              setValue('title', book.title || '');
              setValue('author', book.author || '');
              setValue('isbn', book.isbn || '');
              setValue('editorial', book.editorial || '');
              setValue('language', book.languaje || '');
              setValue('publication_date',  book.publication_date ? book.publication_date.split('T')[0] : '');
              setValue('price', book.price || 0);
              setValue('genreid', book.genreid || '1');
              setValue('stock', book.stock || '1');
              setValue('image', book.image || '');
              setValue('summary', book.summary || '');
            }
            else {
                reset();
            }
        }
        else {
          reset();
        }
      }, [book, setValue, reset]);

    return (
        <>
        <Header />
        <div className="editBox">
        <div className="errorMessage">{error && <p>{error}</p>}</div>
            <form onSubmit={handleSubmit(doCreateUpdate)}>
                <div>
                    <label>Título</label>
                    <input type ="text" {...register("title", { required: true })} />
                    {errors.title && <p className='errorInput'>El título es obligatorio</p>}
                </div>
                <div>
                    <label>Autor</label>
                    <input type ="text" {...register("author")} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input type ="text" {...register("isbn", { required: true })} />
                    {errors.isbn && <p className='errorInput'>El ISBN es obligatorio</p>}
                </div>
                <div>
                    <label>Editorial</label>
                    <input type ="text" {...register("editorial")} />
                </div>
                <div>
                    <label>Idioma </label>
                    <select {...register('language')}>
                        {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Fecha Publicacion</label>
                    <input type ="date" {...register("publication_date", {valueAsDate: true})} />
                </div>
                <div>
                    <label>Precio en €</label>
                    <input type ="number"  step="0.01" {...register("price")} min='0'/>
                </div>
                <div>
                    <label>Género</label>
                    <select {...register('genreid', { required: true })}>
                        {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                            {genre.label}
                        </option>
                        ))}
                    </select>
                    {errors.genreid && <p className='errorInput'>El género es obligatorio</p>}
                </div> 
                <div>
                    <label type="url">Imagen</label>
                    <input type ="url" {...register("image")} />
                </div>
                <div>
                    <label>Unidades</label>
                    <input type ="number" {...register("stock")} />
                </div>
                <div>
                    <label>Reumen</label>
                    <input type ="textarea" {...register("summary", { required: true })} />
                    {errors.summary && <p className='errorInput'>El Resumen es obligatorio</p>}
                </div>
                <div className='editBoxButtons'>
                    <button>Cancelar</button>
                    <button>Borrar</button>
                </div>
                <input type="submit" />
            </form>
        </div>
        <Footer />
        </>
    )
}

export default EditPage;