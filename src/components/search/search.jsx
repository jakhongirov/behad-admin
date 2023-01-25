import './search.scss'

function Search({ link, value, setValue, setSearch }) {

    return (
        <>
            <section className="search">
                <div className='search__box'>
                    <select className=''
                        defaultValue={"phone"}
                        onChange={(evt) => {
                            setValue(evt.target.value);
                        }} >
                        {
                            link === "users" ? (
                                <>
                                    <option value="id">id</option>
                                    <option value="name">Name</option>
                                    <option value="surname">Surname</option>
                                    <option value="age">Age</option>
                                    <option value="phone">Phone</option>
                                </>
                            ) : link === "survey"
                                ? (
                                    <>
                                        <option value="id">id</option>
                                    </>
                                )
                                : (
                                    <>
                                        <option value="id">id</option>
                                        <option value="name">Name</option>
                                        <option value="key">Key</option>
                                    </>
                                )
                        }
                    </select>
                    <div className="">
                        <input className="search-input" onChange={(e) => setSearch(e.target.value.trim())} type={value === "id" || value === "age" ? "number" : "text"} placeholder="Search" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Search