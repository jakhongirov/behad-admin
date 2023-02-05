import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";

import TestNavbar from "../testNavbar/testNavbar";

function TestQuestion() {
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
    const [test, setTest] = useState([])


    useEffect(() => {
        fetch('https://psychology.behad.uz/api/v1/questions?' + value + "=" + search, {
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

    useEffect(() => {
        fetch('https://psychology.behad.uz/api/v1/tests?position=all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setTest(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [value, search, token, deleted])

    const HandlePost = (e) => {
        const formData = new FormData();
        e.preventDefault();
        const {
            title,
            testId,
            point_1,
            answer_1,
            point_2,
            answer_2,
            point_3,
            answer_3,
            point_4,
            answer_4,
            point_5,
            answer_5,
            point_6,
            answer_6,
            photo
        } = e.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("testId", testId.value.trim());
        formData.append("point_1", point_1.value.trim());
        formData.append("point_2", point_2.value.trim());
        formData.append("point_3", point_3.value.trim());
        formData.append("point_4", point_4.value.trim());
        formData.append("point_5", point_5.value.trim());
        formData.append("point_6", point_6.value.trim());
        formData.append("answer_1", answer_1.value.trim());
        formData.append("answer_2", answer_2.value.trim());
        formData.append("answer_3", answer_3.value.trim());
        formData.append("answer_4", answer_4.value.trim());
        formData.append("answer_5", answer_5.value.trim());
        formData.append("answer_6", answer_6.value.trim());

        axios.post("https://psychology.behad.uz/api/v1/addQuestion", formData, {
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
            testId,
            point_1,
            answer_1,
            point_2,
            answer_2,
            point_3,
            answer_3,
            point_4,
            answer_4,
            point_5,
            answer_5,
            point_6,
            answer_6,
            photo
        } = e.target.elements

        formData.append("photo", photo.files[0]);
        formData.append("title", title.value.trim());
        formData.append("testId", testId.value.trim());
        formData.append("point_1", point_1.value.trim());
        formData.append("point_2", point_2.value.trim());
        formData.append("point_3", point_3.value.trim());
        formData.append("point_4", point_4.value.trim());
        formData.append("point_5", point_5.value.trim());
        formData.append("point_6", point_6.value.trim());
        formData.append("answer_1", answer_1.value.trim());
        formData.append("answer_2", answer_2.value.trim());
        formData.append("answer_3", answer_3.value.trim());
        formData.append("answer_4", answer_4.value.trim());
        formData.append("answer_5", answer_5.value.trim());
        formData.append("answer_6", answer_6.value.trim());

        axios.put("https://psychology.behad.uz/api/v1/updateQuestion", formData, {
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
                        setEdit(false)
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

        fetch("https://psychology.behad.uz/api/v1/deleteQuestion", {
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

        fetch("https://psychology.behad.uz/api/v1/questions?position=next&id=" + id, {
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

        fetch('https://psychology.behad.uz/api/v1/questions?position=prev&id=' + id, {
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
                <section className="test">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Test id</th>
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
                                            <td>{e.test_question_id}</td>
                                            <td>{e.test_question_text.split(' ').length > 3 ? e.test_question_text.split(' ').slice(0, 3).join(' ') + '...' : e.test_question_text}</td>
                                            <td>{e.test_id}</td>
                                            <td>{e.to_char}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.test_question_id)
                                                        setFound(
                                                            {
                                                                title: e.test_question_text,
                                                                testId: e.test_id,
                                                                answer_1: e.test_answer_1,
                                                                answer_2: e.test_answer_2,
                                                                answer_3: e.test_answer_3,
                                                                answer_4: e.test_answer_4,
                                                                answer_5: e.test_answer_5,
                                                                answer_6: e.test_answer_6,
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
                                                        setId(e.test_question_id)
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
                                data-id={data[0]?.test_question_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.test_question_id}
                                onClick={HandleLimitNext}
                                disabled={data.length === 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this test question</h4>
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

                                    <select name="testId" style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        {
                                            test.map((e, i) => (
                                                <option key={i} value={e.test_id}>{e.test_title}</option>
                                            ))
                                        }
                                    </select>

                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_1' placeholder='point_1' required />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_1' placeholder='answer_1' required />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_2' placeholder='point_2' required />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_2' placeholder='answer_2' required />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_3' placeholder='point_3' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_3' placeholder='answer_3' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_4' placeholder='point_4' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_4' placeholder='answer_4' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_5' placeholder='point_5' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_5' placeholder='answer_5' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='point_6' placeholder='point_6' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='answer_6' placeholder='answer_6' />
                                    </div>

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
                    </div>

                    <div className={edit ? "modal" : "modal--close"}>
                        <div className="modal__item">
                            <form onSubmit={HandlePut}>
                                <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' defaultValue={found?.title} required />

                                <select name="testId" style={{ 'marginBottom': "10px", "padding": "10px" }} defaultValue={found?.testId}>
                                    {
                                        test.map((e, i) => (
                                            <option key={i} value={e.test_id}>{e.test_title}</option>
                                        ))
                                    }
                                </select>

                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_1' placeholder='point_1' defaultValue={found?.answer_1 && Object.keys(found?.answer_1)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_1' placeholder='answer_1' defaultValue={found?.answer_1 && found?.answer_1[Object.keys(found?.answer_1)[0]]} />
                                </div>
                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_2' placeholder='point_2' defaultValue={found?.answer_2 && Object.keys(found?.answer_2)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_2' placeholder='answer_2' defaultValue={found?.answer_2 && found?.answer_2[Object.keys(found?.answer_2)[0]]} />
                                </div>
                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_3' placeholder='point_3' defaultValue={found?.answer_3 && Object.keys(found?.answer_3)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_3' placeholder='answer_3' defaultValue={found?.answer_3 && found?.answer_3[Object.keys(found?.answer_3)[0]]} />
                                </div>
                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_4' placeholder='point_4' defaultValue={found?.answer_4 && Object.keys(found?.answer_4)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_4' placeholder='answer_4' defaultValue={found?.answer_4 && found?.answer_4[Object.keys(found?.answer_4)[0]]} />
                                </div>
                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_5' placeholder='point_5' defaultValue={found?.answer_5 && Object.keys(found?.answer_5)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_5' placeholder='answer_5' defaultValue={found?.answer_5 && found?.answer_5[Object.keys(found?.answer_5)[0]]} />
                                </div>
                                <div className='app__form-box'>
                                    <input className='login__phone__input app__input app__input--width' type="text" name='point_6' placeholder='point_6' defaultValue={found?.answer_6 && Object.keys(found?.answer_6)[0]} />
                                    <input className='login__phone__input app__input app__input--width' type="text" name='answer_6' placeholder='answer_6' defaultValue={found?.answer_6 && found?.answer_6[Object.keys(found?.answer_6)[0]]} />
                                </div>

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
                </section>
            </main>
        </>
    )
}

export default TestQuestion