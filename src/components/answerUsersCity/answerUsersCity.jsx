import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AnswerUsersCity() {
    const { surveyId, answer, country } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/answers?survayId=' + surveyId + '&answer=' + answer + '&country=' + country + "&sort=city", {
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
                                    <th>Users Cities</th>
                                    <th>Users Count</th>
                                    <th>Users</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_capital}</td>
                                            <td>{e.count}</td>
                                            <td>
                                                <button
                                                    className="edit__btn"
                                                    onClick={() => navigate('/answerCityUsers/' + surveyId + '/' + answer + '/' + e.user_capital)}
                                                >
                                                    Users
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

export default AnswerUsersCity;