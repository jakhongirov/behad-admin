import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';


function Answers() {
    const [data, setData] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [answers, setAnswers] = useState()
    const [v1, setV1] = useState()
    const [v2, setV2] = useState()
    const [v3, setV3] = useState()
    const [v4, setV4] = useState()
    const [v5, setV5] = useState()
    const [v6, setV6] = useState()
    const [status, setStatus] = useState(false)

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/survaysAdmin?' + "id" + "=" + search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
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
    }, [value, search, token])

    const HandleSurveyAnswer = async (e) => {
        const id = JSON.parse(e.target.dataset.id);

        await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
          await  fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=1', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=2', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=3', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=4', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=5', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

            await fetch('https://survey.behad.uz/api/v1/answers?survayId=' + id + '&answer=6', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
                <Search link={"none"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="answers">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Survey id</th>
                                    <th>Survey Title</th>
                                    <th>Survey Comment</th>
                                    <th>Survey Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.survay_id}</td>
                                            <td>{e.survay_title.split(' ').length > 3 ? e.survay_title.split(' ').slice(0, 3).join(' ') + '...' : e.survay_title}</td>
                                            <td>{e.survay_iscomment ? "on" : "off"}</td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    style={{ "background": "rgba(99, 94, 94, 0.8)" }}
                                                    data-id={e.survay_id}
                                                    onClick={HandleSurveyAnswer}
                                                >
                                                    Status
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={status ? "modal" : "modal--close"}>
                            <div className="modal__item">

                                <h2 style={{ "marginBottom": "16px" }}>{answers?.data.length > 0 ? answers?.data[0].survay_title : "No answers"}</h2>

                                {
                                    answers?.data.length > 0 ? answers?.data[0].survay_iscomment ? (
                                        <>
                                            <h3 style={{ "marginBottom": "5px" }}>{`Comment: ${answers?.data[0].survay_iscomment ? "on" : "off"}`}</h3>
                                            <p>{`count : ${answers?.count}`}</p>
                                            <p>{`male : ${answers?.male}`}</p>
                                            <p>{`female : ${answers?.female}`}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 style={{ "marginBottom": "5px" }}>Option 1</h3>
                                            <p>{`count : ${v1?.count}`}</p>
                                            <p>{`male : ${v1?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v1?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 2</h3>
                                            <p>{`count : ${v2?.count}`}</p>
                                            <p>{`male : ${v2?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v2?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 3</h3>
                                            <p>{`count : ${v3?.count}`}</p>
                                            <p>{`male : ${v3?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v3?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 4</h3>
                                            <p>{`count : ${v4?.count}`}</p>
                                            <p>{`male : ${v4?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v4?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Option 5</h3>
                                            <p>{`count : ${v5?.count}`}</p>
                                            <p>{`male : ${v5?.male}`}</p>
                                            <p style={{ "marginBottom": "5px" }}>{`female : ${v5?.female}`}</p>

                                            <h3 style={{ "marginBottom": "5px" }}>Opiton 6</h3>
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

export default Answers