import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"
import Search from '../search/search';

function Pill() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [search, setSearch] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState()
    const [found, setFound] = useState([])
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch('https://posts.behad.uz/api/v1/pills?name=' + search, {
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
    }, [token, search, deleted])

    const HandlePost = (e) => {
        e.preventDefault();
        const { name, type, producer, ingredient, category, instruction } = e.target.elements

        fetch('https://posts.behad.uz/api/v1/addPill', {
            method: "POST",
            body: JSON.stringify({
                name: name.value.trim(),
                type: type.value.trim(),
                producer: producer.value.trim(),
                instruction: instruction.value.trim(),
                ingredient: ingredient.value.trim(),
                category: category.value.trim(),
            }),
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
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

    const HandleById = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://posts.behad.uz/api/v1/pills?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setFound(data.data)
                    setEdit(true)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandlePut = (e) => {
        e.preventDefault();
        const { name, type, producer, ingredient, category, instruction } = e.target.elements

        fetch('https://posts.behad.uz/api/v1/putPill', {
            method: "PUT",
            body: JSON.stringify({
                id: found[0]?.pill_id,
                name: name.value.trim(),
                type: type.value.trim(),
                producer: producer.value.trim(),
                instruction: instruction.value.trim(),
                ingredient: ingredient.value.trim(),
                category: category.value.trim(),
            }),
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
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

        fetch("https://posts.behad.uz/api/v1/deletePill", {
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

        fetch("https://posts.behad.uz/api/v1/pills?position=next&id=" + id, {
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

        fetch("https://posts.behad.uz/api/v1/pills?position=prev&id=" + id, {
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
            <main className="main">
                <Search link={"trackingFilter"} setSearch={setSearch} />
                <section className="pill">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Catrgory</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.pill_id}</td>
                                            <td>{e.pill_name}</td>
                                            <td>{e.pill_category.split(' ').length > 3 ? e.pill_category.split(' ').slice(0, 3).join(' ') + '...' : e.pill_category}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    data-id={e.pill_id}
                                                    onClick={HandleById}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='delete__btn'
                                                    onClick={() => {
                                                        setId(e.pill_id)
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

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add Pill</button>
                        </div>

                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.pill_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.pill_id}
                                onClick={HandleLimitNext}
                                disabled={data.length >= 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this pill</h4>
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
                                    <input className='login__phone__input app__input' type="text" name='name' placeholder='Pill name' required />
                                    <input className='login__phone__input app__input' type="text" name='type' placeholder='Pill type' required />
                                    <input className='login__phone__input app__input' type="text" name='producer' placeholder='Pill producer' required />
                                    <input className='login__phone__input app__input' type="text" name='ingredient' placeholder='Pill ingredient' required />
                                    <input className='login__phone__input app__input' type="text" name='category' placeholder='Pill category' required />
                                    <textarea cols="46" rows="10" className='login__phone__input app__input' type="text" name='instruction' placeholder='Pill instruction' required />

                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit && found.length > 0 ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut} data-id={found[0]?.pill_id}>
                                    <input className='login__phone__input app__input' type="text" name='name' placeholder='Pill name' defaultValue={found[0]?.pill_name} />
                                    <input className='login__phone__input app__input' type="text" name='type' placeholder='Pill type' defaultValue={found[0]?.pill_type} />
                                    <input className='login__phone__input app__input' type="text" name='producer' placeholder='Pill producer' defaultValue={found[0]?.pill_producer} />
                                    <input className='login__phone__input app__input' type="text" name='ingredient' placeholder='Pill ingredient' defaultValue={found[0]?.pill_active_ingredient} />
                                    <input className='login__phone__input app__input' type="text" name='category' placeholder='Pill category' defaultValue={found[0]?.pill_category} />
                                    <textarea cols="46" rows="10" className='login__phone__input app__input' type="text" name='instruction' placeholder='Pill instruction' defaultValue={found[0]?.pill_instruction} />

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

export default Pill;