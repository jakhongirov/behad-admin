import "./news.scss"
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";
import parse from "html-react-parser";

import Header from "../header/header"
import Search from '../search/search';

function News() {
    const [data, setData] = useState([])
    const [news, setNew] = useState([])
    const [apps, setApps] = useState()
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)
    const [found, setFound] = useState({})
    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/news', {
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
        const { title, photo, desc, app_key } = evt.target.elements
        let selected = [];
        for (let option of app_key.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("desc", desc.value);
        formData.append("app_key", selected.join(", ") ? selected.join(", ") : "all");


        axios.post("https://users.behad.uz/api/v1/addnew", formData, {
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
                console.log(data);
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

    const HandlePut = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, photo, desc, app_key } = evt.target.elements
        let selected = [];
        for (let option of app_key.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        formData.append("id", id);
        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("desc", desc.value);
        formData.append("app_key", selected.join(", ") ? selected.join(", ") : "all");

        axios.put("https://users.behad.uz/api/v1/updatenew", formData, {
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
                console.log(data);
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
        fetch("https://users.behad.uz/api/v1/deletenew", {
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

    const HandleNews = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/news?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setNew(data.data);
                    setShow(true)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch("https://users.behad.uz/api/v1/news?position=next&id=" + id, {
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

        fetch("https://users.behad.uz/api/v1/news?position=prev&id=" + id, {
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
                <Search link={"post"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="news">
                    <div className="container">

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Likes</th>
                                    <th>Disikes</th>
                                    <th>Views</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.new_id}</td>
                                            <td>{e.new_title.split(' ').length > 3 ? e.new_title.split(' ').slice(0, 3).join(' ') + '...' : e.new_title}</td>
                                            <td>{e.likes_count}</td>
                                            <td>{e.dislike_count}</td>
                                            <td>{e.views_count}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.new_id}
                                                    onClick={HandleNews}>
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.new_id)
                                                        setFound(
                                                            {
                                                                title: e.new_title,
                                                                desc: e.new_description,
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
                                                    onClick={() => {
                                                        setId(e.new_id)
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

                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.new_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.new_id}
                                onClick={HandleLimitNext}
                                disabled={data.length >= 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add New</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this news</h4>
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

                                    <select name="app_key" multiple style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        <option value="all">Hammasi</option>
                                        {
                                            apps && apps.map((e, i) => (
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

                                    <textarea name="desc" cols="46" rows="10"></textarea>

                                    <a style={{ "display": "block", "marginBottom": "10px" }} href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>

                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' defaultValue={found?.title} required />

                                    <select name="app_key" multiple style={{ 'marginBottom': "10px", "padding": "10px" }} defaultValue={found?.app_key}>
                                        <option value="all">Hammasi</option>
                                        {
                                            apps && apps.map((e, i) => (
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

                                    <textarea name="desc" cols="46" rows="10" defaultValue={found?.desc}></textarea>

                                    <a style={{ "display": "block", "marginBottom": "10px" }} href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>

                                    <button className='login__btn'>Edit</button>
                                </form>
                                <button className='login__btn' onClick={() => setEdit(!edit)}>Close</button>
                            </div>
                        </div>

                        <div className={show ? "modal" : "modal--close"}>
                            <div className="modal__item modal__item--show" style={{ "maxWidth": "800px" }}>
                                <h2 style={{ "display": "block", "marginBottom": "10px" }}>{news?.new_title}</h2>
                                <div style={{ "display": "block", "marginBottom": "10px" }}>
                                    <h4 style={{ "display": "block", "marginBottom": "10px" }}>Image: </h4>
                                    <img src={news?.new_img} alt={news?.new_img_name} width={600} height={300} />
                                </div>

                                <div style={{ "display": "block", "marginBottom": "10px" }}>
                                    {parse(`${news?.new_description}`)}
                                </div>

                                <button className='login__btn' onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default News