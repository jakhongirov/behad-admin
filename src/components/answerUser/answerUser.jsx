import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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


                    </div>
                </section>
            </main>
        </>
    )

}

export default AnswerUsers