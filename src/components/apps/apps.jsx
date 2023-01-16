import './apps.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"
import Search from '../search/search';

function Apps() {
    const [data, setData] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState()
    const [found, setFound] = useState({})
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)



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
        const { name, key, cur_vs, min_vs, price } = e.target.elements

        fetch("https://users.behad.uz/api/v1/addApp", {
            method: "POST",
            body: JSON.stringify({
                name: name.value.trim(),
                current_vs: cur_vs.value.trim(),
                min_vs: min_vs.value.trim(),
                key: key.value.trim(),
                price: price.value.trim()
            }),
            headers: { token: token, "Content-Type": "application/json", },
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
        const { name, key, cur_vs, min_vs, price } = e.target.elements

        fetch("https://users.behad.uz/api/v1/updeteApp", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name: name.value.trim(),
                current_vs: cur_vs.value.trim(),
                min_vs: min_vs.value.trim(),
                key: key.value.trim(),
                price: price.value.trim()
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

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

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

            <main className='main'>
                <Search link={"app"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="app">
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
                                                                price: e.app_price
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
                                                    data-id={e.app_id}
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
                                    <input className='login__phone__input app__input' type="text" name='name' placeholder='App name' required />
                                    <input className='login__phone__input app__input' type="text" name='key' placeholder='App key' required />

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="number" name='cur_vs' placeholder='current version' required />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='min_vs' placeholder='min version' required />
                                    </div>
                                    <input className='login__phone__input app__input' type="text" name='price' placeholder='Price' required />


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