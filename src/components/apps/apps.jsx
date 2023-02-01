import './apps.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';

import Header from "../header/header"
import Search from '../search/search';

function Apps() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [value, setValue] = useState('id')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState()
    const [found, setFound] = useState({})
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/apps?' + value + "=" + search, {
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

    const HandlePost = (e) => {
        e.preventDefault();
        const { name, key, cur_vs, min_vs, price, payment, app_post } = e.target.elements

        fetch("https://users.behad.uz/api/v1/addApp", {
            method: "POST",
            body: JSON.stringify({
                name: name.value.trim(),
                current_vs: cur_vs.value.trim(),
                min_vs: min_vs.value.trim(),
                key: key.value.trim(),
                price: price.value.trim(),
                payment: payment.value.trim(),
                app_post: app_post.checked
            }),
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                    setAdd(false)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    const HandlePut = (e) => {
        e.preventDefault();
        const { name, key, cur_vs, min_vs, price, payment, app_post } = e.target.elements

        fetch("https://users.behad.uz/api/v1/updeteApp", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name: name.value.trim(),
                current_vs: cur_vs.value.trim(),
                min_vs: min_vs.value.trim(),
                key: key.value.trim(),
                price: price.value.trim(),
                payment: payment.value.trim(),
                app_post: app_post.checked
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                    setEdit(false)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    const HandleDelete = () => {

        fetch("https://users.behad.uz/api/v1/deleteApp", {
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

        fetch("https://users.behad.uz/api/v1/apps?position=next&id=" + id, {
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

        fetch("https://users.behad.uz/api/v1/apps?position=prev&id=" + id, {
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
            <Header />
            <main className='main'>
                <Search link={"app"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="users">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Current Version</th>
                                    <th>Min Version</th>
                                    <th>Key</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.app_id}</td>
                                            <td>{e.app_name}</td>
                                            <td>{e.app_current_version}</td>
                                            <td>{e.app_min_version}</td>
                                            <td>{e.app_key}</td>
                                            <td>{`${e.app_price} sum`}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.app_id)
                                                        setFound(
                                                            {
                                                                name: e.app_name,
                                                                cur_vs: e.app_current_version,
                                                                min_vs: e.app_min_version,
                                                                key: e.app_key,
                                                                price: e.app_price,
                                                                payment: e.app_payment,
                                                                app_post: e.app_post
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
                                                        setId(e.app_id)
                                                        setDelModal(!delModal)
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                            <td>
                                                {
                                                    e.app_post ? (
                                                        <button
                                                            className='edit__btn'
                                                            style={{ "background": "green" }}
                                                            onClick={() => navigate('/category/' + e.app_key)}
                                                        >
                                                            Post
                                                        </button>
                                                    ) : ""
                                                }

                                                {
                                                    e.app_key === 'psixologiya' ? (
                                                        <button
                                                            className='edit__btn'
                                                            style={{ "background": "#0496ff" }}
                                                            onClick={() => navigate('/testCategories')}
                                                        >
                                                            Test
                                                        </button>
                                                    ) : ""
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={"pagination__btnbox"}>
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.app_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.app_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add App</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this app</h4>
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
                                    <input className='login__phone__input app__input' type="text" name='name' placeholder='App name' required />
                                    <input className='login__phone__input app__input' type="text" name='key' placeholder='App key' required />

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="number" name='cur_vs' placeholder='current version' required />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='min_vs' placeholder='min version' required />
                                    </div>
                                    <input className='login__phone__input app__input' type="text" name='price' placeholder='Price' required />
                                    <div style={{ "marginBottom": "15px", "display": "flex", "alignItems": "center", 'maxWidth': "90px", "justifyContent": "space-between" }}>
                                        <label htmlFor="app_post">App post</label>
                                        <input type="checkbox" id='app_post' name='app_post' defaultChecked={found?.app_post} />
                                    </div>
                                    <input className='login__phone__input app__input' type="text" name='payment' placeholder='Payment link' required />


                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut}>
                                    <input className='login__phone__input app__input' type="text" name='name' placeholder='App name' defaultValue={found?.name} required />
                                    <input className='login__phone__input app__input' type="text" name='key' placeholder='App key' defaultValue={found?.key} required />

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="number" name='cur_vs' placeholder='current version' defaultValue={found?.cur_vs} required />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='min_vs' placeholder='min version' defaultValue={found?.min_vs} required />
                                    </div>

                                    <input className='login__phone__input app__input' type="text" name='price' placeholder='Price' defaultValue={found?.price} required />
                                    <div style={{ "marginBottom": "15px", "display": "flex", "alignItems": "center", 'maxWidth': "90px", "justifyContent": "space-between" }}>
                                        <label htmlFor="app_post">App post</label>
                                        <input type="checkbox" id='app_post' name='app_post' defaultChecked={found?.app_post} />
                                    </div>
                                    <input className='login__phone__input app__input' type="text" name='payment' placeholder='Payment link' defaultValue={found?.payment} />


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

export default Apps