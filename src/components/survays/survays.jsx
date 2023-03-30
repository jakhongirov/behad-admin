import "./survays.scss"
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"
import Search from '../search/search';
import { useNavigate } from "react-router-dom";

function Survays() {
    const [data, setData] = useState([])
    const [apps, setApps] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [add, setAdd] = useState(false)
    const [deleted, setDelete] = useState(0)
    const [id, setId] = useState()
    const [found, setFound] = useState({})
    const [edit, setEdit] = useState(false)
    const [single, setSingle] = useState([])
    const [info, setInfo] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [delModal, setDelModal] = useState(false)
    const [answers, setAnswers] = useState()
    const [v1, setV1] = useState()
    const [v2, setV2] = useState()
    const [v3, setV3] = useState()
    const [v4, setV4] = useState()
    const [v5, setV5] = useState()
    const [v6, setV6] = useState()
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://survey.behad.uz/api/v1/survaysAdmin?id=" + search, {
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
    }, [token])


    const HandlePost = (e) => {
        e.preventDefault();
        const { title, v1, v2, v3, v4, v5, limit, who, min_age, max_age, commment, country, city, filter, main, user_comment, app_key, user_id } = e.target.elements

        let arr = filter.value.split(',').map(e => Number(e))
        let arr2 = user_id.value.split(',').map(e => Number(e))


        let selected = [];
        for (let option of app_key.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }


        fetch("https://survey.behad.uz/api/v1/Addsurvay", {
            method: "POST",
            body: JSON.stringify({
                title: title.value.trim(),
                v1: v1.value.trim(),
                v2: v2.value.trim(),
                v3: v3.value.trim(),
                v4: v4.value.trim(),
                v5: v5.value.trim(),
                v6_comment: user_comment.checked,
                limit: limit.value - 0,
                survay_male: who.value === "survay_male" ? true : who.value === "all" ? true : false,
                survay_female: who.value === "survay_female" ? true : who.value === "all" ? true : false,
                min_age: min_age.value - 0,
                max_age: max_age.value - 0,
                survay_iscomment: commment.checked,
                country: country.value.trim(),
                city: city.value.trim(),
                filter: arr,
                main: main.checked,
                app_key: selected ? selected.join(", ") : "all",
                user_id: arr2
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
        const { title, v1, v2, v3, v4, v5, limit, who, min_age, max_age, commment, country, city, filter, main, user_comment, app_key, user_id } = e.target.elements

        let arr = filter.value.split(',').map(e => Number(e))
        let arr2 = user_id.value.split(',').map(e => Number(e))


        let selected = [];
        for (let option of app_key.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        fetch("https://survey.behad.uz/api/v1/updatesurvay", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                title: title.value.trim(),
                v1: v1.value.trim(),
                v2: v2.value.trim(),
                v3: v3.value.trim(),
                v4: v4.value.trim(),
                v5: v5.value.trim(),
                v6_comment: user_comment.checked,
                limit: limit.value - 0,
                survay_male: who.value === "survay_male" ? true : who.value === "all" ? true : false,
                survay_female: who.value === "survay_female" ? true : who.value === "all" ? true : false,
                min_age: min_age.value - 0,
                max_age: max_age.value - 0,
                survay_iscomment: commment.checked,
                country: country.value.trim(),
                city: city.value.trim(),
                filter: arr,
                main: main.checked,
                app_key: selected ? selected.join(", ") : found?.app_key,
                user_id: arr2
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

    const checkboxChange = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        const status = e.target.checked

        fetch("https://survey.behad.uz/api/v1/updateSurvayStatus", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                status: status
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 410) {
                    setDelete(deleted + 1)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    const HandleDelete = () => {
        fetch("https://survey.behad.uz/api/v1/deletesurvay", {
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

    const HandleSurvey = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://survey.behad.uz/api/v1/survays?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setSingle(data.data);
                    setInfo(true)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch("https://survey.behad.uz/api/v1/survaysAdmin?position=next&id=" + id, {
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

        fetch("https://survey.behad.uz/api/v1/survaysAdmin?position=prev&id=" + id, {
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

    const HandleSurveyAnswer = async (e) => {
        const id = JSON.parse(e.target.dataset.id);

        await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setAnswers(data);
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))

        if (answers?.data.survay_iscomment) {
            setStatus(true)

        } else {
            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=1&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setV1(data);
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=2&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setV2(data);
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=3&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setV3(data);
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=4&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setV4(data);
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=5&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setV5(data);
                        setStatus(true)
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=6&sort=count', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        setV6(data);
                        setStatus(true)
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))
        }
    }

    return (
        <>
            <Header />
            <main className="main">
                <Search link={"survey"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="survays users">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>option 1</th>
                                    <th>option 2</th>
                                    <th>option 3</th>
                                    <th>option 4</th>
                                    <th>option 5</th>
                                    <th>option 6</th>
                                    <th>Comment</th>
                                    <th>limit</th>
                                    <th>Active</th>
                                    <th>Main</th>
                                    <th>Views</th>
                                    <th>Status</th>
                                    <th>Answers</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.survay_id}</td>
                                            <td>{e.survay_title.split(' ').length > 3 ? e.survay_title.split(' ').slice(0, 3).join(' ') + '...' : e.survay_title}</td>
                                            <td>{e.survay_v1.split(' ').length > 3 ? e.survay_v1.split(' ').slice(0, 3).join(' ') + '...' : !e.survay_v1 ? '-' : e.survay_v1}</td>
                                            <td>{e.survay_v2.split(' ').length > 3 ? e.survay_v2.split(' ').slice(0, 3).join(' ') + '...' : !e.survay_v2 ? '-' : e.survay_v2}</td>
                                            <td>{e.survay_v3.split(' ').length > 3 ? e.survay_v3.split(' ').slice(0, 3).join(' ') + '...' : !e.survay_v3 ? '-' : e.survay_v3}</td>
                                            <td>{e.survay_v4.split(' ').length > 3 ? e.survay_v4.split(' ').slice(0, 3).join(' ') + '...' : !e.survay_v4 ? '-' : e.survay_v4}</td>
                                            <td>{e.survay_v5.split(' ').length > 3 ? e.survay_v5.split(' ').slice(0, 3).join(' ') + '...' : !e.survay_v5 ? '-' : e.survay_v5}</td>
                                            <td>{e.survay_v6_comment ? "On" : "Off"}</td>
                                            <td>{e.survay_iscomment ? "On" : "Off"}</td>
                                            <td>{e.survay_limit}</td>
                                            <td>
                                                <div className="customers_checkbox_wrapper">
                                                    <label className="checkbox-container customers_checkbox-container">
                                                        <input
                                                            defaultChecked={e.survay_active}
                                                            required
                                                            className="customer_input"
                                                            type="checkbox"
                                                            data-id={e.survay_id}
                                                            onChange={checkboxChange}

                                                        />
                                                        <span className="checkmark customers_checkmark">
                                                            <div></div>
                                                        </span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{e.survay_main ? "On" : "Off"}</td>
                                            <td>{e.survay_views}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.survay_id}
                                                    onClick={HandleSurvey}
                                                >
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='delete__btn'
                                                    style={{ "background": "#0496ff" }}
                                                    data-id={e.survay_id}
                                                    onClick={HandleSurveyAnswer}
                                                >
                                                    Answers
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.survay_id)
                                                        setFound(
                                                            {
                                                                title: e.survay_title,
                                                                v1: e.survay_v1,
                                                                v2: e.survay_v2,
                                                                v3: e.survay_v3,
                                                                v4: e.survay_v4,
                                                                v5: e.survay_v5,
                                                                v6: e.survay_v6_comment,
                                                                main: e.survay_main,
                                                                all: e.survay_all,
                                                                male: e.survay_male,
                                                                female: e.survay_female,
                                                                min: e.survay_min_age,
                                                                max: e.survay_max_age,
                                                                country: e.survay_country,
                                                                city: e.survay_city,
                                                                comment: e.survay_iscomment,
                                                                limit: e.survay_limit,
                                                                filter: e.survay_filter,
                                                                app_key: e.app_key.split(", "),
                                                                user_id: e.user_id
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
                                                        setId(e.survay_id)
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
                                data-id={data[0]?.survay_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.survay_id}
                                onClick={HandleLimitNext}
                                disabled={data.length >= 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px", "height": "120px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this survey</h4>
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

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add Survey</button>
                        </div>

                        <div className={add ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePost}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' required />
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v1' placeholder='option 1' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v2' placeholder='option 2' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v3' placeholder='option 3' />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v4' placeholder='option 4' />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v5' placeholder='option 5' />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='limit' defaultValue={0} placeholder='limit' required />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="number" name='min_age' placeholder='min age' defaultValue={0} required />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='max_age' placeholder='max age' defaultValue={100} required />
                                    </div>
                                    <div className='app__form-box' style={{ 'marginBottom': "10px" }}>
                                        <select name="who" defaultValue={"all"}>
                                            <option value="all">Hamma</option>
                                            <option value="survay_male">Erkak</option>
                                            <option value="survay_female">Ayol</option>
                                        </select>
                                        <div>
                                            <label> turn on comment</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='commment' />
                                        </div>
                                    </div>
                                    <div className='app__form-box' style={{ 'marginBottom': "10px" }}>
                                        <div>
                                            <label>User comment</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='user_comment' />
                                        </div>
                                        <div>
                                            <label>Main survey</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='main' />
                                        </div>
                                    </div>

                                    <select name="app_key" defaultValue={["all"]} multiple style={{ 'marginBottom': "10px", "padding": "10px" }}>
                                        <option value="all">Hammasi</option>
                                        {
                                            apps && apps.map((e, i) => (
                                                <option key={i} value={e.app_key}>{e.app_name}</option>
                                            ))
                                        }
                                    </select>

                                    <input className='login__phone__input app__input' type="text" name='country' placeholder='country' defaultValue={'all'} required />
                                    <input className='login__phone__input app__input' type="text" name='city' placeholder='city' defaultValue={'all'} required />
                                    <input className='login__phone__input app__input' type="text" name='filter' placeholder='filter' defaultValue={0} />
                                    <input className='login__phone__input app__input' type="text" name='user_id' placeholder='user id' defaultValue={0} />


                                    <button className='login__btn'>Add</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={HandlePut}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' required defaultValue={found?.title} />
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v1' placeholder='option 1' defaultValue={found?.v1} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v2' placeholder='option 2' defaultValue={found?.v2} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v3' placeholder='option 3' defaultValue={found?.v3} />
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v4' placeholder='option 4' defaultValue={found?.v4} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="text" name='v5' placeholder='option 5' defaultValue={found?.v5} />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='limit' placeholder='limit' required defaultValue={found?.limit} />
                                    </div>
                                    <div className='app__form-box'>
                                        <input className='login__phone__input app__input app__input--width' type="number" name='min_age' placeholder='min age' required defaultValue={found?.min} />
                                        <input className='login__phone__input app__input app__input--width' type="number" name='max_age' placeholder='max age' required defaultValue={found?.max} />
                                    </div>
                                    <div className='app__form-box' style={{ 'marginBottom': "10px" }}>
                                        <select name="who" defaultValue={found?.male ? "survay_male" : found?.female ? "survay_female" : "all"}>
                                            <option value="all">Hamma</option>
                                            <option value="survay_male">Erkak</option>
                                            <option value="survay_female">Ayol</option>
                                        </select>
                                        <div>
                                            <label> turn on comment</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='commment' defaultChecked={found?.comment} />
                                        </div>
                                    </div>
                                    <div className='app__form-box' style={{ 'marginBottom': "10px" }}>
                                        <div>
                                            <label>User comment</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='user_comment' defaultChecked={found?.v6} />
                                        </div>
                                        <div>
                                            <label>Main survey</label>
                                            <input className='login__phone__input app__input app__input--width' type="checkbox" name='main' defaultChecked={found?.main} />
                                        </div>
                                    </div>

                                    <select name="app_key" defaultValue={found?.app_key} multiple style={{ 'marginBottom': "10px" }}>
                                        <option value="all">Hammasi</option>
                                        {
                                            apps && apps.map((e, i) => (
                                                <option key={i} value={e.app_key}>{e.app_name}</option>
                                            ))
                                        }
                                    </select>

                                    <input className='login__phone__input app__input' type="text" name='country' placeholder='country' required defaultValue={found?.country} />
                                    <input className='login__phone__input app__input' type="text" name='city' placeholder='city' required defaultValue={found?.city} />
                                    <input className='login__phone__input app__input' type="text" name='filter' placeholder='filter' defaultValue={found?.filter} />
                                    <input className='login__phone__input app__input' type="text" name='user_id' placeholder='user id' defaultValue={found?.user_id} />


                                    <button className='login__btn'>Edit</button>
                                </form>
                                <button className='login__btn' onClick={() => setEdit(!edit)}>Close</button>
                            </div>
                        </div>

                        <div className={info ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <h2 style={{ "marginBottom": "16px" }}>{single[0]?.survay_title}</h2>
                                <p>{`Option 1: ${single[0]?.survay_v1 ? single[0]?.survay_v1 : '-'}`}</p>
                                <p>{`Option 2: ${single[0]?.survay_v2 ? single[0]?.survay_v2 : '-'}`}</p>
                                <p>{`Option 3: ${single[0]?.survay_v3 ? single[0]?.survay_v3 : '-'}`}</p>
                                <p>{`Option 4: ${single[0]?.survay_v4 ? single[0]?.survay_v4 : '-'}`}</p>
                                <p>{`Option 5: ${single[0]?.survay_v5 ? single[0]?.survay_v5 : '-'}`}</p>
                                <p>{`Option 6: ${single[0]?.survay_v6_comment ? "on" : 'off'}`}</p>
                                <p>{`Comment: ${single[0]?.survay_iscomment ? "on" : 'off'}`}</p>
                                <p>{`Main survey: ${single[0]?.survay_main ? "on" : 'off'}`}</p>
                                <p>{`Who: ${single[0]?.survay_male && single[0]?.survay_female ? "all" : single[0]?.survay_male ? "male" : single[0]?.survay_female ? "female" : ""}`}</p>
                                <p>{`Min: ${single[0]?.survay_min_age} years old`}</p>
                                <p>{`Max: ${single[0]?.survay_max_age} years old`}</p>
                                <p>{`Limit: ${single[0]?.survay_limit}`}</p>
                                <p>{`Filter: ${single[0]?.survay_filter.join(', ')}`}</p>
                                <p>{`User id: ${single[0]?.user_id.join(', ')}`}</p>
                                <p>{`App key: ${single[0]?.app_key ? single[0]?.app_key : "-"}`}</p>
                                <p>{`Country: ${single[0]?.survay_country}`}</p>
                                <p>{`City: ${single[0]?.survay_city}`}</p>
                                <p>{`Status: ${single[0]?.survay_active ? "active" : 'disactive'}`}</p>
                                <p>{`Date: ${single[0]?.to_char}`}</p>
                                <button className='login__btn' style={{ "marginTop": "20px" }} onClick={() => setInfo(!info)}>Close</button>
                            </div>
                        </div>

                        <div className={status ? "modal" : "modal--close"}>
                            <div className="modal__item">

                                <h2 style={{ "marginBottom": "16px" }}>{answers?.data.length > 0 ? answers?.data[0].survay_title : "No answers"}</h2>

                                {
                                    answers?.data.length > 0 ? answers?.data[0].survay_iscomment ? (
                                        <>
                                            <h3 style={{ "marginBottom": "5px" }}>{`Comment: ${answers?.data[0].survay_iscomment ? "on" : "off"}`}
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "5px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/0")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/0")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${answers?.count}`}</p>
                                            <p>{`male : ${answers?.male}`}</p>
                                            <p>{`female : ${answers?.female}`}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 style={{ "marginBottom": "5px" }}>Option 1
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/1")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/1")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v1?.count}`}</p>
                                            <p>{`male : ${v1?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v1?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 2
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/2")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/2")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v2?.count}`}</p>
                                            <p>{`male : ${v2?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v2?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 3
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/3")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/3")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v3?.count}`}</p>
                                            <p>{`male : ${v3?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v3?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 4
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/4")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/4")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v4?.count}`}</p>
                                            <p>{`male : ${v4?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v4?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 5
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/5")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/5")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v5?.count}`}</p>
                                            <p>{`male : ${v5?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v5?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Opiton 6
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "grey",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsers/' + answers?.data[0].survay_id + "/6")}
                                                >
                                                    Users
                                                </button>
                                                <button
                                                    className="edit__btn"
                                                    style={{
                                                        "display": "inline-block",
                                                        "marginLeft": "10px",
                                                        "background": "green",
                                                        "border": "none",
                                                        "padding": "8px",
                                                        "fontSize": "12px"
                                                    }}
                                                    onClick={() => navigate('/answerUsersFilter/' + answers?.data[0].survay_id + "/6")}
                                                >
                                                    Filter
                                                </button>
                                            </h3>
                                            <p>{`count : ${v6?.count}`}</p>
                                            <p>{`male : ${v6?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v6?.female}`}</p>

                                        </>
                                    ) : "none"
                                }

                                <button className='login__btn' style={{ "marginTop": "20px" }} onClick={() => setStatus(!status)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Survays