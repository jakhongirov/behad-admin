import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';

function Category() {
    const [data, setData] = useState()
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetch('http://users.behad.uz/api/v1/apps', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <>
            <Header />
            <main className="main">
                <Search link={"none"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="category">
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
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' required />
                                    <select name="app_key">
                                        {

                                        }
                                    </select>
                                    <input
                                        className='login__phone__input app__input'
                                        type="file"
                                        name="photo"
                                        placeholder="Imge"
                                        required />

                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Category 
