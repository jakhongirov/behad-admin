import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function UserCity() {
    const { country } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [sort, setSort] = useState('users_count desc')
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCity?country=' + country + '&sort=' + sort, {
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
    }, [token, country, sort])



    return (
        <>
            <Header />
            <main className="main">
                <section className="user">
                    <div className="continer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Users Cities</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'users_count' ? 'users_count desc' : 'users_count')}
                                    >Users Count</th>
                                    <th>Users</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_capital}</td>
                                            <td>{e.users_count}</td>
                                            <td>
                                                <button
                                                    className="edit__btn"
                                                    onClick={() => navigate('/userCountry-City/' + country + '/' + e.user_capital)}
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

export default UserCity