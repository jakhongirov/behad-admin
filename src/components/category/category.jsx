import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";


import Header from "../header/header"
import Search from '../search/search';

function Category() {
    const [data, setData] = useState([])
    const [apps, setApps] = useState([])
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)
    const [found, setFound] = useState({})
    const [edit, setEdit] = useState(false)

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
                    setData(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [deleted])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/apps', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setApps(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [])

    const HandlePost = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, app_key, photo } = evt.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("name", title.value.trim());
        formData.append("app_key", app_key.value);

        axios.post("http://localhost:8000/api/v1/addCategory", formData, {
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
                    setDelete(Number(deleted) + 1) 
                    if (data.status === 200) {
                        console.log(data.status);
                        setAdd(false)
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

    const HandleEdit = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { photo, title, app_key } = evt.target.elements

        formData.append("id", id);
        formData.append("name", title.value.trim());
        formData.append("app_key", app_key.value);
        formData.append("photo", photo.files[0]);

        axios.put("http://localhost:8000/api/v1/updateCategory", formData, {
            headers: {
                'Content-Type': 'form-data',
                'Accept': 'application/json',
                "type": "formData",
                "Access-Control-Allow-Origin": "*",
                token: token
            }
        })
            .then((data) => {
                if (data) {
                    if (data.status === 200) {
                        setEdit(false)
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

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        fetch("http://localhost:8000/api/v1/deleteCategory", {
            method: "Delete",
            body: JSON.stringify({
                id: id
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

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
                                    <th>Name</th>
                                    <th>App key</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.category_id}</td>
                                            <td>{e.category_name.split(' ').length > 3 ? e.category_name.split(' ').slice(0, 3).join(' ') + '...' : e.category_name}</td>
                                            <td>{e.app_key}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.category_id)
                                                        setFound(
                                                            {
                                                                title: e.category_name,
                                                                app_key: e.app_key
                                                            }
                                                        )
                                                        setEdit(!edit)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='delete__btn'
                                                    data-id={e.category_id}
                                                    onClick={HandleDelete}
                                                >
                                                    Delete
                                                </button>
                                            </td>
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

                                    <select name="app_key" multiple style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        {
                                            apps.map((e, i) => (
                                                <option key={i} value={e.app_key}>{e.app_name}</option>
                                            ))
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

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandleEdit}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' defaultValue={found?.title} required />

                                    <select name="app_key" defaultValue={found?.app_key} style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        {
                                            apps.map((e, i) => (
                                                <option key={i} value={e.app_key}>{e.app_name}</option>
                                            ))
                                        }
                                    </select>

                                    <input
                                        className='login__phone__input app__input'
                                        type="file"
                                        name="photo"
                                        placeholder="Imge"
                                    />

                                    <button className='login__btn'>Edit</button>
                                </form>
                                <button className='login__btn' onClick={() => setEdit(!edit)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Category 
