import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";

import Header from "../header/header"
import Search from '../search/search';

function Posts() {
    const [data, setData] = useState()
    const [categories, setCategoties] = useState([])
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/posts', {
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
    }, [deleted])

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setCategoties(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [deleted])

    const HandlePost = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, categoryId, photo, desc } = evt.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("categoryId", categoryId.value);
        formData.append("desc", desc.value);

        axios.post("http://localhost:8000/api/v1/addPost", formData, {
            headers: {
                'Content-Type': 'form-data',
                "type": "formData",
                'Accept': 'application/json',
                "type": "formData",
                "Access-Control-Allow-Origin": "*",
                token: token
            }
        })
            .then((data) => {
                if (data) {
                    if (data.status === 200) {
                        setAdd(false)
                        setDelete(deleted + 1)
                    }
                    if (data.data.status === 401) {
                        setToken(false)
                    }
                    else {
                        console.log(data);
                    }
                }
            });
    }

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
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.post_id}</td>
                                            <td>{e.post_title.split(' ').length > 3 ? e.post_title.split(' ').slice(0, 3).join(' ') + '...' : e.post_title}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add App</button>
                        </div>

                        <div className={add ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePost}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' required />

                                    <select name="app_key" style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        {
                                            categories.map((e, i) => (
                                                <option key={i} value={e.category_id}>{e.category_name}</option>
                                            ))
                                        }
                                    </select>

                                    <input
                                        className='login__phone__input app__input'
                                        type="file"
                                        name="photo"
                                        placeholder="Imge"
                                        required />

                                    <textarea name="desc" cols="46" rows="10"></textarea>

                                    <a style={{ "display": "block", "marginBottom": "10px" }} href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>

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

export default Posts