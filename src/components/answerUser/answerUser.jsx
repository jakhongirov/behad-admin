import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AnswerUsers() {
    const { surveyId, answer } = useParams()
    const [data, setData] = useState([])
    const [comment, setComment] = useState()
    const [model, setModel] = useState()
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [token, setToken] = useToken()
    const [tracking, setTracking] = useState([])
    const [show, setShow] = useState(false)
    const [user, setUser] = useState([])
    const [appUser, setAppUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (answer === 'commnet') {
            fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId + '&max=' + max + '&min=' + min, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
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
        } else {
            fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId + '&answer=' + answer + '&max=' + max + '&min=' + min, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        setData(data.data);
                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))
        }

    }, [token, surveyId, answer, max, min])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/trackingUsersCount', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setTracking(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

    const HandleUserComment = async (e) => {
        const id = JSON.parse(e.target.dataset.id);

        if (answer === 'comment') {
            const comment = await data.filter((e) => e.id === id ? setComment(e.survay_comment) : "")
            setModel(true)
            return comment
        } else if (answer === '6') {
            const v6 = await data.filter((e) => e.id === id ? setComment(e.v6_comment) : "")
            setModel(true)
            return v6
        }

    }

    const HandleUser = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/users?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setUser(data.data);
                    setShow(true)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))


        fetch('https://users.behad.uz/api/v1/appUsers?userId=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setAppUser(data.data)
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
                <section className="users">
                    <div className="container">

                        <input className="login__phone__input app__input app__input--width" type="number" placeholder="min age" onChange={(e) => setMin(e.target.value)} />
                        <input className="login__phone__input app__input app__input--width" type="number" placeholder="max age" onChange={(e) => setMax(e.target.value)} />

                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Age</th>
                                    <th>Who</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Tracking</th>
                                    <th>More</th>
                                    {
                                        answer === '6' || answer === 'comment' ? (<th>Survey comment</th>) : ""
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.user_surname}</td>
                                            <td>{e.user_age}</td>
                                            <td>{e.user_who}</td>
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_country}</td>
                                            <td>{e.user_capital}</td>
                                            <td>
                                                {tracking.filter((a) => a.user_id == e.id)[0]?.count}
                                            </td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.id}
                                                    onClick={HandleUser}>
                                                    •••
                                                </button>
                                            </td>
                                            {
                                                answer === '6' || answer === 'comment' ? (
                                                    <>
                                                        <td>
                                                            {
                                                                answer === 'comment' ?
                                                                    e.survay_comment.split(' ').length > 5 ? e.survay_comment.split(' ').slice(0, 3).join(' ') + '...' : e.survay_comment
                                                                    : answer === '6' ?
                                                                        e.v6_comment.split(' ').length > 5 ? e.v6_comment.split(' ').slice(0, 3).join(' ') + '...' : e.v6_comment
                                                                        : ""
                                                            }
                                                        </td>
                                                        <td>
                                                            <button
                                                                className='more__btn'
                                                                data-id={e.id}
                                                                onClick={HandleUserComment}
                                                            >
                                                                •••
                                                            </button>
                                                        </td></>
                                                ) : ""
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={model ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Comment</h4>
                                <p>{comment}</p>
                                <button className='login__btn' style={{ "marginTop": "20px" }} onClick={() => setModel(!model)}>Close</button>
                            </div>
                        </div>

                        <div className={show ? "modal" : "modal--close"}>
                            <div className='modal__item' style={{ "maxWidth": "500px" }}>
                                <h2 style={{ "marginBottom": "10px" }}>User data {user[0]?.user_id}</h2>
                                <p>{`Name: ${user[0]?.user_name}`}</p>
                                <p>{`Surname: ${user[0]?.user_surname}`}</p>
                                <p>{`Age: ${user[0]?.user_age}`}</p>
                                <p>{`Who: ${user[0]?.user_who}`}</p>
                                <p>Tel: <a href={`tel:${user[0]?.user_phone}`}>{user[0]?.user_phone}</a></p>
                                <p>{`Cauntry: ${user[0]?.user_country}`}</p>
                                <p>{`City: ${user[0]?.user_capital}`}</p>
                                <p>{`Balance: ${user[0]?.user_balance}`}</p>
                                <p>{`Phone Brand: ${user[0]?.user_phone_brand}`}</p>
                                <p>{`Phone Model: ${user[0]?.user_phone_model}`}</p>
                                <p>{`Phone Language: ${user[0]?.user_phone_lang}`}</p>
                                <p>{`Phone Android version: ${user[0]?.user_phone_android_version ? user[0]?.user_phone_android_version.join(', ') : "-"}`}</p>
                                <p style={{ "marginBottom": "20px" }}>{`Date: ${user[0]?.to_char}`}</p>
                                <h3 style={{ "marginBottom": "5px" }}>User apps</h3>
                                {
                                    appUser && appUser.map((e, i) => (
                                        <div key={i}
                                            style={{ "display": "flex", "maxWidth": "200px", "justifyContent": "space-between", "marginBottom": "10px" }}
                                        >
                                            <p>{e.app_name}</p>
                                            <button
                                                onClick={() => {
                                                    setShow(false)
                                                    navigate(`/tracking/${user[0]?.user_id}/${e.app_key}`)
                                                }}>Tracking</button>
                                        </div>
                                    ))
                                }
                                <button style={{ "marginBottom": "0px" }} className='login__btn' onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )

}

export default AnswerUsers