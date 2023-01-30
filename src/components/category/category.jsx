import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import useToken from '../../Hooks/useToken';
import axios from "axios";


import AppPost from "../appPost/appPost";
// import Header from "../header/header"
// import Search from '../search/search';

function Category({ SetAppKey }) {
    const { app_key } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    // const [value, setValue] = useState('')
    // const [search, setSearch] = useState('') 
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState(0)
    const [found, setFound] = useState({})
    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        SetAppKey(app_key)
        fetch('https://posts.behad.uz/api/v1/categories?key=' + app_key, {
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
    }, [token, deleted])

    const HandlePost = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, photo } = evt.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("name", title.value.trim());
        formData.append("app_key", app_key);

        axios.post("https://posts.behad.uz/api/v1/addCategory", formData, {
            headers: {
                'Content-Type': 'form-data',
                "type": "formData",
                'Accept': 'application/json',
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
        const { photo, title } = evt.target.elements

        formData.append("id", id);
        formData.append("name", title.value.trim());
        formData.append("app_key", app_key);
        formData.append("photo", photo.files[0]);

        axios.put("https://posts.behad.uz/api/v1/updateCategory", formData, {
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
        fetch("https://posts.behad.uz/api/v1/deleteCategory", {
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

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://posts.behad.uz/api/v1/categories?key=' + app_key + "&position=next&id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setDisabled(false)
                    setData(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleLimitPrev = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://posts.behad.uz/api/v1/categories?key=' + app_key + "&position=prev&id=" + id, {
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
    }

    return (
        <>
            <AppPost />
            <main className="main">
                {/* <Search link={"none"} value={value} setValue={setValue} setSearch={setSearch} /> */}
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
                                                                title: e.category_name
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

                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.category_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.category_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add App</button>
                        </div>

                        <div className={add ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePost}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' required />

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
