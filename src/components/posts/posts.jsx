import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';


function Posts() {
    const [data, setData] = useState()
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/categories", {
            method: "GET"
        }).then(res => res.json())
    }, [])


    return (
        <>
            <Header />
            <main className="main">
                <Search link={"post"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="post">
                    <div className="container">

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>id</th>
                                </tr>

                                <tbody>
                                    {

                                    }
                                </tbody>
                            </thead>
                        </table>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add App</button>
                        </div>

                        <div className={add ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form>
                                    
                                    <a href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>

                                </form>

                                <button className='login__btn' onClick={() => setAdd(!add   )}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>




        </>
    )
}

export default Posts