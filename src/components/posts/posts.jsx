import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";
import parse from "html-react-parser";


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
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState({})
    const [post, setPost] = useState({})


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

    const HandlePut = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, photo, desc, categoryId } = evt.target.elements
        let selected = [];
        for (let option of categoryId.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        formData.append("id", id);
        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("desc", desc.value);
        formData.append("categoryId", selected.join(", ") ? selected.join(", ") : "all");

        axios.put("http://localhost:8000/api/v1/updatePost", formData, {
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

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        fetch("http://localhost:8000/api/v1/deletePost", {
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

    const HandleSingePost = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('http://localhost:8000/api/v1/posts?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setPost(data.data);
                    setShow(true)
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
                <section className="users">
                    <div className="container">

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Category Id</th>
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
                                            <td>{e.post_id}</td>
                                            <td>{e.post_title.split(' ').length > 3 ? e.post_title.split(' ').slice(0, 3).join(' ') + '...' : e.post_title}</td>
                                            <td>{e.category_id}</td>
                                            <td>{e.like_count}</td>
                                            <td>{e.dislike_count}</td>
                                            <td>{e.view_count}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.post_id}
                                                    onClick={HandleSingePost}
                                                >
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setFound({
                                                            title: e.post_title,
                                                            categoryId: e.category_id,
                                                            desc: e.post_desc
                                                        })
                                                        setId(e.post_id)
                                                        setEdit(true)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='delete__btn'
                                                    data-id={e.post_id}
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

                                    <select name="categoryId" style={{ 'marginBottom': "10px", "padding": "10px" }}>
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

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' defaultValue={found?.title} required />

                                    <select name="categoryId" defaultValue={found?.categoryId} style={{ 'marginBottom': "10px", "padding": "10px" }}>
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
                                <h2 style={{ "display": "block", "marginBottom": "10px" }}>{post?.post_title}</h2>
                                <div style={{ "display": "block", "marginBottom": "10px" }}>
                                    <h4 style={{ "display": "block", "marginBottom": "10px" }}>Image: </h4>
                                    <img src={post?.post_img} alt={post?.post_img_name} width={600} height={300} />
                                </div>

                                <div style={{ "display": "block", "marginBottom": "10px" }}>
                                    {parse(`${post?.post_desc}`)}
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

export default Posts