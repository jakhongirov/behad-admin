import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import Header from "../header/header"

function AppUserByKey() {
    const { key } = useParams()
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/appUsersByKey?key=' + key, {
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
    }, [token, key])

    const checkboxChange = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        const status = e.target.checked

        fetch("https://users.behad.uz/api/v1/editProVersion", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                pro_v: status
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }


    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch("https://users.behad.uz/api/v1/appUsersByKey?position=next&id=" + id + "&key=" + key, {
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

        fetch("https://users.behad.uz/api/v1/appUsersByKey?position=prev&id=" + id + "&key=" + key, {
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
                                            <td>{e.app_user_interested_to_buy}</td>
                                            <td>
                                                <div className="customers_checkbox_wrapper">
                                                    <label className="checkbox-container customers_checkbox-container">
                                                        <input
                                                            defaultChecked={e.app_user_ispayed}
                                                            required
                                                            className="customer_input"
                                                            type="checkbox"
                                                            data-id={e.app_user_id}
                                                            onChange={checkboxChange}
                                                        />
                                                        <span className="checkmark customers_checkmark">
                                                            <div></div>
                                                        </span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td style={{ "paddingRight": "5px" }}>{e.to_char}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={"pagination__btnbox"}>
                            <button
                                className="prev_btn add__btn"
                                data-id={data[0]?.app_user_id}
                                onClick={HandleLimitPrev}
                                disabled={disabled}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                data-id={data[data.length - 1]?.app_user_id}
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

export default AppUserByKey