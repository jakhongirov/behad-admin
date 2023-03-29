import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from '../header/header';

function TrackLogin() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/trackLogin', {
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
    }, [token,])

    return (
        <>
            <Header />
            <main className="main">
                <section className="users">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Enter</th>
                                    <th>Login phone</th>
                                    <th>Login password</th>
                                    <th>Login success</th>
                                    <th>Login fail</th>
                                    <th>Register phone</th>
                                    <th>Register password</th>
                                    <th>Register success</th>
                                    <th>Register fail</th>
                                    <th>Data</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.track_login_id}</td>
                                            <td>{e.track_enter}</td>
                                            <td>{e.track_login_phone}</td>
                                            <td>{e.track_login_password}</td>
                                            <td>{e.track_login_success}</td>
                                            <td>{e.track_login_fail}</td>
                                            <td>{e.track_register_phone}</td>
                                            <td>{e.track_register_password}</td>
                                            <td>{e.track_register_success}</td>
                                            <td>{e.track_register_fail}</td>
                                            <td>{e.to_char}</td>
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

export default TrackLogin;