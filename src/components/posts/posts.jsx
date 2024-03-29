import './posts.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";
import parse from "html-react-parser";


import AppPost from "../appPost/appPost";
// import Header from "../header/header"
// import Search from '../search/search';

function Posts({ appKey }) {
    const [data, setData] = useState([])
    const [categories, setCategoties] = useState([])
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    // const [value, setValue] = useState('')
    // const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState({})
    const [post, setPost] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)

    useEffect(() => {
        fetch('https://posts.behad.uz/api/v1/posts?key=' + appKey, {
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

    useEffect(() => {
        fetch('https://posts.behad.uz/api/v1/categories?key=' + appKey, {
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
    }, [token, deleted])

    const HandlePost = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        const { title, categoryId, photo, desc } = evt.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("categoryId", categoryId.value);
        formData.append("desc", desc.value);

        axios.post("https://posts.behad.uz/api/v1/addPost", formData, {
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

        axios.put("https://posts.behad.uz/api/v1/updatePost", formData, {
            headers: {
                'Content-Type': 'form-data',
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
        fetch("https://posts.behad.uz/api/v1/deletePost", {
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

    const HandleSingePost = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://posts.behad.uz/api/v1/posts?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
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

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://posts.behad.uz/api/v1/posts?key=' + appKey + "&position=next&id=" + id, {
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

        fetch('https://posts.behad.uz/api/v1/posts?key=' + appKey + "&position=prev&id=" + id, {
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
                {/* <Search link={"post"} value={value} setValue={setValue} setSearch={setSearch} /> */}
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
                                                    onClick={() => {
                                                        setId(e.post_id)
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
                                data-id={data[0]?.post_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.post_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add Post</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this post</h4>
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