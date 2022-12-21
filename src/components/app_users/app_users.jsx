import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import Header from "../header/header";
import Search from "../search/search";


function AppUser() {
    const [data, setData] = useState()
    const [token] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')


    console.log(data);

    useEffect(() => {
        fetch('http://192.168.7.168:8000/api' + '/appUsers?' + value + "=" + search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => data.status === 200 ? setData(data.data) : console.log(data))
            .catch((e) => console.log(e))
    }, [value, search])

    console.log(data );

    return (
        <>
            <Header />
            <main className="main">
                <Search link={"app"} value={value} setValue={setValue} setSearch={setSearch} />
                <main className="main">
                    <section className="app_user">
                        <div className="container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>User Id</th>
                                        <th>App Name</th>
                                        <th>User Name</th>
                                        <th>User Phone</th>
                                        <th>Current Version</th>
                                        <th>Min Version</th>
                                        <th>Key</th>
                                        <th>PRO version</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((e, i) => (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{e.user_id}</td>
                                                <td>{e.app_name}</td>
                                                <td>{e.user_name}</td>
                                                <td>{e.user_phone}</td>
                                                <td>{e.app_current_version}</td>
                                                <td>{e.app_min_version}</td>
                                                <td>{e.app_key}</td>
                                                <td>{e.app_user_isPayed ? "yes" : "no"}</td>
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