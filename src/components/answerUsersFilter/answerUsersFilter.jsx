import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AnswerUsersFilter() {
    const { surveyId, answer } = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [token, setToken] = useToken()

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId + '&answer=' + answer + "&sort=country", {
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
    }, [token])


    return (
        <>
            <Header />
            <main className="main">
                <section>
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Users Country</th>
                                    <th>Users Count</th>
                                    <th>Country's cities</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_country}</td>
                                            <td>{e.count}</td>
                                            <td>
                                                <button
                                                    className="edit__btn"
                                                    onClick={() => navigate('/answerUsersCity/' + surveyId + '/' + answer + '/' + e.user_country)}
                                                >
                                                    Cities
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AnswerUsersFilter;