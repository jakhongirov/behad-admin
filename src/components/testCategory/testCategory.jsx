import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";

import TestNavbar from "../testNavbar/testNavbar";

function TestCategory() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [value, setValue] = useState('title')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState()
    const [found, setFound] = useState({})
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)

    useEffect(() => {
        fetch('https://psychology.behad.uz/api/v1/testCategories?' + value + "=" + search, {
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
    }, [value, search, token, deleted])

    const HandlePost = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, photo } = evt.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());

        axios.post("https://psychology.behad.uz/api/v1/addTestCategories", formData, {
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
        formData.append("title", title.value.trim());
        formData.append("photo", photo.files[0]);

        axios.put("https://psychology.behad.uz/api/v1/updateTestCategories", formData, {
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

    const HandleDelete = () => {

        fetch("https://psychology.behad.uz/api/v1/deleteTestCategories", {
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
                    setDelModal(false)
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

        fetch("https://psychology.behad.uz/api/v1/testCategories?position=next&id=" + id, {
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

        fetch('https://psychology.behad.uz/api/v1/testCategories?position=prev&id=' + id, {
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

    const HandleUpdateAppVersion = () => {

        fetch("https://users.behad.uz/api/v1/updeteContentVersionApp", {
            method: "PUT",
            body: JSON.stringify({
                app_key: "psixologiya"
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
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
            <TestNavbar />

            <main className="main">
                <section className="test">
                    <div className="container">

                        <button
                            className="edit__btn"
                            style={{ "border": "none", "background": "green" }}
                            onClick={HandleUpdateAppVersion}
                        >
                            Update App version
                        </button>

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.test_category_id}</td>
                                            <td>{e.test_category_title.split(' ').length > 3 ? e.test_category_title.split(' ').slice(0, 3).join(' ') + '...' : e.test_category_title}</td>
                                            <td>{e.to_char}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.test_category_id)
                                                        setFound(
                                                            {
                                                                title: e.test_category_title
                                                            }
                                                        )
                                                        setEdit(!edit)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='delete__btn'
                                                    onClick={() => {
                                                        setId(e.test_category_id)
                                                        setDelModal(!delModal)
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={"pagination__btnbox"}>
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.test_category_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.test_category_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this test category</h4>
                                <div className={"pagination__btnbox"} style={{ "margin": "0 auto" }}>
                                    <button
                                        className="prev_btn add__btn"
                                        onClick={() => setDelModal(!delModal)}
                                    >Not</button>
                                    <button
                                        className="delete__btn"
                                        onClick={HandleDelete}
                                    >Yes</button>
                                </div>
                            </div>
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

export default TestCategory