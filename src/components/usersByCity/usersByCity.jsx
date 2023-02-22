import { useState, useEffect } from "react";
import { useParams ,useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function UserByCity() {
    const { country, city } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [disabled, setDisabled] = useState(true)
    const [show, setShow] = useState(false)
    const [user, setUser] = useState([])
    const [appUser, setAppUser] = useState([])
    const navigate = useNavigate()

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

    const HandleUser = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/users?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setUser(data.data);
                    setShow(true)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))


        fetch('https://users.behad.uz/api/v1/appUsers?userId=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setAppUser(data.data)
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
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Age</th>
                                    <th>Who</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_id}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.user_surname}</td>
                                            <td>{e.user_age}</td>
                                            <td>{e.user_who}</td>
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_country}</td>
                                            <td>{e.user_capital}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.user_id}
                                                    onClick={HandleUser}>
                                                    •••
                                                </button>
                                            </td>
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

                        <div className={show ? "modal" : "modal--close"}>
                            <div className='modal__item' style={{ "maxWidth": "500px" }}>
                                <h2 style={{ "marginBottom": "10px" }}>User data {user[0]?.user_id}</h2>
                                <p>{`Name: ${user[0]?.user_name}`}</p>
                                <p>{`Surname: ${user[0]?.user_surname}`}</p>
                                <p>{`Age: ${user[0]?.user_age}`}</p>
                                <p>{`Who: ${user[0]?.user_who}`}</p>
                                <p>Tel: <a href={`tel:${user[0]?.user_phone}`}>{user[0]?.user_phone}</a></p>
                                <p>{`Cauntry: ${user[0]?.user_country}`}</p>
                                <p>{`City: ${user[0]?.user_capital}`}</p>
                                <p>{`Balance: ${user[0]?.user_balance}`}</p>
                                <p>{`Phone Brand: ${user[0]?.user_phone_brand}`}</p>
                                <p>{`Phone Model: ${user[0]?.user_phone_model}`}</p>
                                <p>{`Phone Language: ${user[0]?.user_phone_lang}`}</p>
                                <p>{`Phone Android version: ${user[0]?.user_phone_android_version ? user[0]?.user_phone_android_version.join(', ') : "-"}`}</p>
                                <p style={{ "marginBottom": "20px" }}>{`Date: ${user[0]?.to_char}`}</p>
                                <h3 style={{ "marginBottom": "5px" }}>User apps</h3>
                                {
                                    appUser && appUser.map((e, i) => (
                                        <div key={i}
                                            style={{ "display": "flex", "maxWidth": "200px", "justifyContent": "space-between", "marginBottom": "20px" }}
                                        >
                                            <p>{e.app_name}</p>
                                            <button
                                                onClick={() => {
                                                    setShow(false)
                                                    navigate(`/tracking/${user[0]?.user_id}/${e.app_key}`)
                                                }}>Tracking</button>
                                        </div>
                                    ))
                                }
                                <button style={{ "marginBottom": "0px" }} className='login__btn' onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UserByCity