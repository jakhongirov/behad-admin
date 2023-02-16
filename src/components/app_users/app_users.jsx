import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header";
import Search from "../search/search";


function AppUser() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [value, setValue] = useState('phone')
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [sort, setSort] = useState('')
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/appUsers?' + value + "=" + search + "&offset=" + offset + '&sort=' + sort, {
            method: "GET",
            headers: {
                "Accep": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
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
    }, [value, search, token, sort, offset, refresh])

    const checkboxChange = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        const status = JSON.parse(e.target.dataset.checked);

        fetch("https://users.behad.uz/api/v1/editProVersion", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                pro_v: !status
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setRefresh(refresh + 1)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Header />
            <main className="main">
                <Search link={"app_user"} value={value} setValue={setValue} setSearch={setSearch} />
                <main className="main">
                    <section className="apps_user">
                        <div className="container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th
                                            style={{
                                                "cursor": "pointer"
                                            }}
                                            onClick={() => setSort(sort === 'app_name' ? 'app_name desc' : 'app_name')}
                                        >App Name</th>
                                        <th
                                            style={{
                                                "cursor": "pointer"
                                            }}
                                            onClick={() => setSort(sort === 'user_name' ? 'user_name desc' : 'user_name')}
                                        >User Name</th>
                                        <th>User Phone</th>
                                        <th>Current Version</th>
                                        <th>Min Version</th>
                                        <th
                                            style={{
                                                "cursor": "pointer"
                                            }}
                                            onClick={() => setSort(sort === 'app_user_interested_to_buy' ? 'app_user_interested_to_buy desc' : 'app_user_interested_to_buy')}
                                        >Buy</th>
                                        <th
                                            style={{
                                                "cursor": "pointer"
                                            }}
                                            onClick={() => setSort(sort === 'app_user_ispayed desc' ? 'app_user_ispayed' : 'app_user_ispayed desc')}
                                        >PRO version</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((e, i) => (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{e.app_name}</td>
                                                <td>{e.user_name}</td>
                                                <td>{e.user_phone}</td>
                                                <td>{e.app_current_version}</td>
                                                <td>{e.app_min_version}</td>
                                                <td>{e.app_user_interested_to_buy}</td>
                                                <td>
                                                    <button
                                                        className='edit__btn'
                                                        style={e.app_user_ispayed ? {
                                                            "background": "green"
                                                        } : {
                                                            "background": "none",
                                                            "color": "black",
                                                            "border": "1px solid red"
                                                        }}
                                                        data-checked={e.app_user_ispayed}
                                                        data-id={e.app_user_id}
                                                        onClick={checkboxChange}
                                                    >
                                                        {e.app_user_ispayed ? "To'lagan" : "Yo'q"}
                                                    </button>
                                                </td>
                                                <td style={{ "paddingRight": "5px" }}>{e.to_char}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>


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
            </main>
        </>
    )
}

export default AppUser;