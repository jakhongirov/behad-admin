import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from '../header/header';
import Search from '../search/search';

function TrackingFilter() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('apps')
    const [day, setDay] = useState(3)
    const [offset, setOffset] = useState(0)
    const [resultCount, setResultCount] = useState(0)
    const [resultTrackingCount, setResultTrackingCount] = useState(0)
    const [sort, setSort] = useState('count desc')

    useEffect(() => {

        if (filter === 'apps') {
            fetch('https://users.behad.uz/api/v1/trackingUsersFilter/apps?day=' + day + '&key=' + search + '&offset=' + offset + "&sort=" + sort, {
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
                        let result1 = 0
                        let result2 = 0

                        for (let i = 0; i < data.data.length; i++) {
                            result1 += Number(data.data[i].count)
                            result2 += Number(data.data[i].tracking_count)
                        }

                        setResultCount(result1);
                        setResultTrackingCount(result2);

                    } else if (data.status === 401) {
                        setToken(false);
                    }
                })
                .catch((e) => console.log(e))
        } else if (filter === 'users') {
            fetch('https://users.behad.uz/api/v1/trackingUsersFilter/users?day=' + day + '&key=' + search + '&offset=' + offset + "&sort=" + sort, {
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

    }, [token, day, search, offset, filter, sort])

    return (
        <>
            <Header />

            <main className="main">
                <Search link={"trackingFilter"} setSearch={setSearch} />
                <section className="tracking">
                    <div className="container">

                        <button
                            className="edit__btn"
                            style={{ "border": "none", "background": "green", 'marginBottom': "20px" }}
                            onClick={() => setFilter(filter === 'apps' ? "users" : "apps")}
                        >
                            Change table
                        </button>

                        <div
                            className='search__box'
                            style={{
                                "marginBottom": "10px",
                            }}
                        >
                            <select
                                defaultValue={day}
                                onChange={(evt) => {
                                    setDay(evt.target.value);
                                }}
                                style={{
                                    "padding": "10px"
                                }}
                            >
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="10">10 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                            </select>

                            <input
                                style={{
                                    "padding": "10px"
                                }}
                                type="number"
                                placeholder="write day"
                                onChange={(e) => setDay(e.target.value)} />
                        </div>

                        {
                            filter === 'users' ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th>App key</th>
                                            <th
                                                style={{
                                                    "cursor": "pointer"
                                                }}
                                                onClick={() => setSort(sort === 'count' ? 'count desc' : 'count')}
                                            >Count</th>
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
                                                    <td>{e.count}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>App key</th>
                                            <th
                                                style={{
                                                    "cursor": "pointer"
                                                }}
                                                onClick={() => setSort(sort === 'count' ? 'count desc' : 'count')}
                                            >User Count</th>
                                            <th
                                                style={{
                                                    "cursor": "pointer"
                                                }}
                                                onClick={() => setSort(sort === 'tracking_count' ? 'tracking_count desc' : 'tracking_count')}
                                            >Tracking count</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>All</td>
                                            <td>{resultCount}</td>
                                            <td>{resultTrackingCount}</td>
                                        </tr>
                                        {
                                            data && data.map((e, i) => (
                                                <tr key={i}>
                                                    <td>{e.app_key}</td>
                                                    <td>{e.count}</td>
                                                    <td>{e.tracking_count}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                        }


                        <div className="pagination__btnbox">
                            <button
                                className="prev_btn add__btn"
                                onClick={() => setOffset(Number(offset) - 50)}
                                disabled={offset === 0 ? true : false}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                onClick={() => setOffset(Number(offset) + 50)}
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