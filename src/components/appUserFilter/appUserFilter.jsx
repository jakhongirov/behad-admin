import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AppUserFilter() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/appUsersCount', {
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
    }, [token])

    return (
        <>
            <Header />

            <main className="main">
                <section className="app_user">
                    <div className="container">
                    <table>
                            <thead>
                                <tr>
                                    <th>App Key</th>
                                    <th>App Users Count</th>
                                    <th>Users</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.app_key}</td>
                                            <td>{e.count}</td>
                                            <td>
                                                <button
                                                    className="edit__btn"
                                                    style={{"background" : "darkcyan"}}
                                                    onClick={() => navigate('/appUserBy/' + e.app_key)}
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

export default AppUserFilter;