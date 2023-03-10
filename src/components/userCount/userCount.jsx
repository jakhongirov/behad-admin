import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"
// import Search from '../search/search';

function UserCount() {
    const [data, setData] = useState([])
    const [sort, setSort] = useState('users_count desc')
    const [token, setToken] = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCountry?sort=' + sort, {
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
    }, [token, sort])

    return (
        <>
            <Header />

            <main className="main">
                <section className="user">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_country' ? 'user_country desc' : 'user_country')}
                                    >Users Country</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'users_count' ? 'users_count desc' : 'users_count')}
                                    >Users Count</th>
                                    <th>Country's cities</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_country}</td>
                                            <td>{e.users_count}</td>
                                            <td>
                                                <button
                                                    className="edit__btn"
                                                    onClick={() => navigate('/userCity/' + e.user_country)}
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

export default UserCount;