import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from '../header/header';
import Search from '../search/search';

function TrackingFilter() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [search, setSearch] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [day, setDay] = useState(3)

    useEffect(() => {
        console.log(day);
        fetch('https://users.behad.uz/api/v1/trackingUsersFilter?day=' + day + '&key=' + search, {
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
    }, [token, day, search])

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/trackingUsersFilter?position=next&day=' + day + '&key=' + search + '&id=' + id, {
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

        fetch('https://users.behad.uz/api/v1/trackingUsersFilter?position=prev&day=' + day + '&key=' + search + '&id=' + id, {
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
                <Search link={"trackingFilter"} setSearch={setSearch} />
                <section className="tracking">
                    <div className="container">

                        <div
                            className='search__box'
                            style={{
                                "marginBottom" : "10px",
                            }}
                        >
                            <select
                                defaultValue={day}
                                onChange={(evt) => {
                                    setDay(evt.target.value);
                                }}
                                style={{
                                    "padding" : "10px"
                                }}
                            >
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="10">10 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                            </select>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>App key</th>
                                    <th>Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{e.user_id}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.app_key}</td>
                                            <td>{e.to_char}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.tracking_user_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.tracking_user_id}
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

export default TrackingFilter;