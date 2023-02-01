import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";

import TestNavbar from "../testNavbar/testNavbar";


function Test() {
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
    const [categories, setCategoties] = useState([])

    useEffect(() => {
        fetch('https://psychology.behad.uz/api/v1/tests?' + value + "=" + search, {
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
                    console.log(data.data[0]);
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [value, search, token, deleted])


    useEffect(() => {
        fetch('https://psychology.behad.uz/api/v1/testCategories?position=all', {
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
    }, [value, search, token, deleted])

    const HandlePost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const {
            title,
            categoryId,
            desc,
            point_1,
            result_1,
            point_2,
            result_2,
            point_3,
            result_3,
            point_4,
            result_4,
            point_5,
            result_5,
            point_6,
            result_6,
            photo
        } = e.target.elements


        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("description", desc.value.trim());
        formData.append("category_id", categoryId.value);
        formData.append("result_1", result_1.value);
        formData.append("result_2", result_2.value);
        formData.append("result_3", result_3.value);
        formData.append("result_4", result_4.value);
        formData.append("result_5", result_5.value);
        formData.append("result_6", result_6.value);
        formData.append("point_1", point_1.value);
        formData.append("point_2", point_2.value);
        formData.append("point_3", point_3.value);
        formData.append("point_4", point_4.value);
        formData.append("point_5", point_5.value);
        formData.append("point_6", point_6.value);

        axios.post("https://psychology.behad.uz/api/v1/addTest", formData, {
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

    const HandlePut = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const {
            title,
            categoryId,
            desc,
            point_1,
            result_1,
            point_2,
            result_2,
            point_3,
            result_3,
            point_4,
            result_4,
            point_5,
            result_5,
            point_6,
            result_6,
            photo
        } = e.target.elements

        formData.append("id", id);
        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("description", desc.value.trim());
        formData.append("category_id", categoryId.value);
        formData.append("result_1", result_1.value);
        formData.append("result_2", result_2.value);
        formData.append("result_3", result_3.value);
        formData.append("result_4", result_4.value);
        formData.append("result_5", result_5.value);
        formData.append("result_6", result_6.value);
        formData.append("point_1", point_1.value);
        formData.append("point_2", point_2.value);
        formData.append("point_3", point_3.value);
        formData.append("point_4", point_4.value);
        formData.append("point_5", point_5.value);
        formData.append("point_6", point_6.value);

        axios.put("https://psychology.behad.uz/api/v1/updateTest", formData, {
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

    const HandleDelete = () => {

        fetch("https://psychology.behad.uz/api/v1/deleteTest", {
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

        fetch("https://psychology.behad.uz/api/v1/tests?position=next&id=" + id, {
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

        fetch('https://psychology.behad.uz/api/v1/tests?position=prev&id=' + id, {
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
            <TestNavbar />

            <main className="main">
                <section className="survays">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Category id</th>
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
                                            <td>{e.test_id}</td>
                                            <td>{e.test_title.split(' ').length > 3 ? e.test_title.split(' ').slice(0, 3).join(' ') + '...' : e.test_title}</td>
                                            <td>{e.test_category_id}</td>
                                            <td>{e.to_char}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.test_id)
                                                        setFound(
                                                            {
                                                                title: e.test_title,
                                                                description: e.test_description,
                                                                categoryId: e.test_category_id,
                                                                result_1: e.test_result_1,
                                                                result_2: e.test_result_2,
                                                                result_3: e.test_result_3,
                                                                result_4: e.test_result_4,
                                                                result_5: e.test_result_5,
                                                                result_6: e.test_result_6,
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
                                                        setId(e.test_id)
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
                                data-id={data[0]?.test_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.test_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this test</h4>
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
                                                <option key={i} value={e.test_category_id}>{e.test_category_title}</option>
                                            ))
                                        }
                                    </select>

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_1' placeholder='point_1' required />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_1' placeholder='result_1' required />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_2' placeholder='point_2' required />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_2' placeholder='result_2' required />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_3' placeholder='point_3' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_3' placeholder='result_3' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_4' placeholder='point_4' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_4' placeholder='result_4' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_5' placeholder='point_5' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_5' placeholder='result_5' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_6' placeholder='point_6' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_6' placeholder='result_6' />
                                    </div>

                                    <textarea style={{ "marginBottom": "15px" }} name="desc" cols="46" rows="10"></textarea>
                                    <a style={{ "display": "block", "marginBottom": "10px" }} href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>


                                    <input
                                        className='login__phone__input app__input'
                                        type="file"
                                        name="photo"
                                        placeholder="Imge"
                                    />


                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' defaultValue={found?.title} required />

                                    <select name="categoryId" style={{ 'marginBottom': "10px", "padding": "10px" }} defaultValue={found?.categoryId}>
                                        {
                                            categories.map((e, i) => (
                                                <option key={i} value={e.test_category_id}>{e.test_category_title}</option>
                                            ))
                                        }
                                    </select>

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_1' placeholder='point_1' defaultValue={found?.result_1 && Object.keys(found?.result_1)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_1' placeholder='result_1' defaultValue={found?.result_1 && found?.result_1[Object.keys(found?.result_1)[0]]} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_2' placeholder='point_2' defaultValue={found?.result_2 && Object.keys(found?.result_2)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_2' placeholder='result_2' defaultValue={found?.result_2 && found?.result_2[Object.keys(found?.result_2)[0]]} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_3' placeholder='point_3' defaultValue={found?.result_3 && Object.keys(found?.result_3)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_3' placeholder='result_3' defaultValue={found?.result_3 && found?.result_3[Object.keys(found?.result_3)[0]]} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_4' placeholder='point_4' defaultValue={found?.result_4 && Object.keys(found?.result_4)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_4' placeholder='result_4' defaultValue={found?.result_4 && found?.result_4[Object.keys(found?.result_4)[0]]} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_5' placeholder='point_5' defaultValue={found?.result_5 && Object.keys(found?.result_5)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_5' placeholder='result_5' defaultValue={found?.result_5 && found?.result_5[Object.keys(found?.result_5)[0]]} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_6' placeholder='point_6' defaultValue={found?.result_6 && Object.keys(found?.result_6)[0]} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='result_6' placeholder='result_6' defaultValue={found?.result_6 && found?.result_6[Object.keys(found?.result_6)[0]]} />
                                    </div>

                                    <textarea style={{ "marginBottom": "15px" }} name="desc" cols="46" rows="10" defaultValue={found?.description}></textarea>
                                    <a style={{ "display": "block", "marginBottom": "10px" }} href="https://html5-editor.net/" target="_blank" rel="noopener noreferrer">Editor</a>

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

export default Test