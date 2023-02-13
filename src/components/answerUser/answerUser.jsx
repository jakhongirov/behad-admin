import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AnswerUsers() {
    const { surveyId, answer } = useParams()
    const [data, setData] = useState([])
    const [comment, setComment] = useState()
    const [model, setModel] = useState()
    const [token, setToken] = useToken()

    useEffect(() => {
        if (answer === 'commnet') {
            fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId, {
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
            fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId + '&answer=' + answer, {
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

    }, [surveyId, answer])

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
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Age</th>
                                    <th>Who</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    {
                                        answer === '6' || answer === 'comment' ? (<th>Survey comment</th>) : ""
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.id}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.user_surname}</td>
                                            <td>{e.user_age}</td>
                                            <td>{e.user_who}</td>
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_country}</td>
                                            <td>{e.user_capital}</td>
                                            {
                                                answer === '6' || answer === 'comment' ? (
                                                    <td>
                                                        <button
                                                            className='more__btn'
                                                            data-id={e.id}
                                                            onClick={HandleUserComment}
                                                        >
                                                            •••
                                                        </button>
                                                    </td>
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