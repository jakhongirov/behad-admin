import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToken from '../../Hooks/useToken';


function Tracking() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const navigate = useNavigate()
    const { userId, key } = useParams()
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/trackingUsers?userId=' + userId + "&key" + key, {
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
                    console.log(data.data);
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [])

    const HandleLimitNext = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch("https://users.behad.uz/api/v1/trackingUsers?position=next&id=" + id + "&userId=" + userId + '&key=' + key, {
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

        fetch("https://users.behad.uz/api/v1/trackingUsers?position=prev&id=" + id + "&userId=" + userId + '&key=' + key, {
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
            <main className="main">
                <section className="tracking">
                    <div className="container">
                        <h1>User Tracking {data[0]?.user_id}</h1>
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

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Tracking