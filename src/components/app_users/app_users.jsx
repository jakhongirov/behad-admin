import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';

import Header from "../header/header";
import Search from "../search/search";


function AppUser() {
    const [data, setData] = useState([])
    const [apps, setApps] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('phone')
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [sort, setSort] = useState('')
    const [userId, setUserId] = useState('')
    const [appKey, setAppKey] = useState('')
    const [offset, setOffset] = useState(0)
    const [show, setShow] = useState(false)
    const [user, setUser] = useState([])
    const [appUser, setAppUser] = useState([])
    const [add, setAdd] = useState(false)
    const navigate = useNavigate()


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

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/apps', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setApps(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

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

    const HandleUser = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        const key = e.target.dataset.key;


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
                    setAppKey(key)
                    setUserId(id)
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

    const SendMessage = (e) => {
        e.preventDefault();
        const { title, message } = e.target.elements

        fetch("https://users.behad.uz/api/v1/sendNotification", {
            method: "PUT",
            body: JSON.stringify({
                id: userId,
                key: appKey,
                title: title.value.trim(),
                message: message.value.trim()
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setShow(false)
                    message.value = null
                    title.value = null
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    const AddUserInterestBAppKey = (e) =>{
        e.preventDefault();
        const { app_key, text } = e.target.elements

        fetch("https://users.behad.uz/api/v1/putUsersInterestByAppKey", {
            method: "PUT",
            body: JSON.stringify({
                app_key: app_key,
                text: text.value.trim()
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setAdd(false)
                    text.value = null
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
                <section className="users">
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'a.user_id' ? 'a.user_id desc' : 'a.user_id')}
                                    >User id</th>
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
                                    <th>More</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_id}</td>
                                            <td>{e.app_name}</td>
                                            <td>{e.user_name}</td>
                                            <td>{e.user_phone}</td>
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
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.user_id}
                                                    data-key={e.app_key}
                                                    onClick={HandleUser}>
                                                    •••
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

                        <div className="add__btn-box">
                            <button className="add__btn" onClick={() => setAdd(!add)}>Add user interest</button>
                        </div>
                        <div className={add ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <form onSubmit={AddUserInterestBAppKey}>

                                    <select name="app_key" style={{ 'marginBottom': "15px", "padding": "10px" }}>
                                        {
                                            apps && apps.map((e, i) => (
                                                <option key={i} value={e.app_key}>{e.app_name}</option>
                                            ))
                                        }
                                    </select>

                                    <textarea
                                        cols={35}
                                        rows={5}
                                        style={{ "display": "block", "marginBottom": "20px", "padding": "10px", "fontSize": "17px" }}
                                        placeholder='user interest'
                                        name="text"></textarea>

                                    <button className='login__btn'>Add user interest</button>
                                </form>
                                <button className='login__btn' onClick={() => setAdd(!add)}>Close</button>
                            </div>
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
                                <form onSubmit={SendMessage}>
                                    <input className='login__phone__input app__input' type="text" name='title' placeholder='Title' />
                                    <textarea
                                        cols={45}
                                        rows={5}
                                        placeholder={'Description'}
                                        style={{ "display": "block", "marginBottom": "20px", "padding": "10px", "fontSize": "17px" }}
                                        name="message"></textarea>
                                    <button style={{ "display": "block", "marginBottom": "15px", "padding": "10px" }}>Send</button>
                                </form>
                                <button style={{ "marginBottom": "0px" }} className='login__btn' onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AppUser;