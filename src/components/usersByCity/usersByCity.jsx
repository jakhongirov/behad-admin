import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function UserByCity() {
    const { country, city } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCountry-City?country=' + country + '&city=' + city, {
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


    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/userCountry-City?country=' + country + '&city=' + city + "&position=next&id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setDisabled(false)
                    setData(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleLimitPrev = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/userCountry-City?country=' + country + '&city=' + city + "&position=prev&id=" + id, {
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.user_id}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.user_surname}</td>
                                            <td>{e.user_age}</td>
                                            <td>{e.user_who}</td>
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_country}</td>
                                            <td>{e.user_capital}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.user_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.user_id}
                                onClick={HandleLimitNext}
                                disabled={data.length >= 50 ? false : true}
                            >Next</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UserByCity