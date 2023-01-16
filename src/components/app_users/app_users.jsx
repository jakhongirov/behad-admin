import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header";
import Search from "../search/search";


function AppUser() {
    const [data, setData] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')


    console.log(value, search);

    useEffect(() => {
        fetch('http://users.behad.uz/api/v1/appUsers?' + value + "=" + search, {
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
    }, [value, search, token])

    return (
        <>
            <Header />
            <main className="main">
                <Search link={"app"} value={value} setValue={setValue} setSearch={setSearch} />
                <main className="main">
                    <section className="apps_user">
                        <div className="container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>App Name</th>
                                        <th>User Name</th>
                                        <th>User Phone</th>
                                        <th>Current Version</th>
                                        <th>Min Version</th>
                                        <th>Buy</th>
                                        <th>PRO version</th>
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
                                                <td>{e.app_user_isterested_to_buy}</td>
                                                <td>{e.app_user_ispayed ? "Yes" : "No"}</td>
                                                <td style={{"paddingRight": "5px"}}>{e.to_char}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </main>
        </>
    )
}

export default AppUser;