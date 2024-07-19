function Nav() {
    return (
        <>
        <nav className='etiquetas'>
                <ul>
                    <li>no-ficción</li>
                    <li>fantasía</li>
                    <li>histórica</li>
                    <li>romántica</li>
                    <li>terror</li>
                    <li>novela negra</li>
                    <li>poesía</li>
                    <li>cómic</li>
                    <li>ciencia ficción</li>
                </ul>
                <div className='search'>
                <input className='searchInput' placeholder=' Buscar por título, autor, género o isbn'/>
                <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />Buscar</button>
                </div>
            </nav>
        </>
    )
}

export default Nav;