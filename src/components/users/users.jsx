import './users.scss'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';

function Users() {
    const [data, setData] = useState([])
    const [user, setUser] = useState([])
    const [appUser, setAppUser] = useState([])
    const [token, setToken] = useToken()
    const [value, setValue] = useState('phone')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState({})
    const navigate = useNavigate()
    const [delModal, setDelModal] = useState(false)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [sort, setSort] = useState('')

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/users?' + value + "=" + search + "&offset=" + offset + '&sort=' + sort, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
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
    }, [value, search, token, deleted, offset, sort])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCount', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setCount(data.count)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token, deleted])

    const HandleDelete = () => {

        fetch("https://users.behad.uz/api/v1/deleteUser", {
            method: "Delete",
            body: JSON.stringify({
                id: id
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                    setDelModal(false)
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
                    setId(id)
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


    const AddComment = (e) => {
        e.preventDefault();
        const { comment } = e.target.elements

        fetch("https://users.behad.uz/api/v1/adminAddcomment", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                comment: comment.value.trim()
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                    setShow(false)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }


    const HandlePut = (e) => {
        e.preventDefault();
        const { name, surname, age, phone, who, password } = e.target.elements

        fetch("https://users.behad.uz/api/v1/editUser", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name: name.value.trim(),
                surname: surname.value.trim(),
                age: age.value - 0,
                phone: phone.value,
                who: who.value,
                password: password.value ? password.value : null
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setDelete(deleted + 1)
                    setEdit(false)
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

            <main className='main'>
                <Search link={"users"} value={value} setValue={setValue} setSearch={setSearch} />
                <section className="users">
                    <div className="container">

                        <p
                            style={{
                                "display": "inline-block",
                                "marginBottom": "20px",
                                "padding": "10px",
                                "background": "green",
                                "color": "white",
                                "borderRadius": "10px"
                            }}
                        >{`Users count: ${count}`}</p>

                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_id' ? 'user_id desc' : 'user_id')}
                                    >Id</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_name' ? 'user_name desc' : 'user_name')}
                                    >Name</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_surname' ? 'user_surname desc' : 'user_surname')}
                                    >Surname</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_age' ? 'user_age desc' : 'user_age')}
                                    >Age</th>
                                    <th
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                        onClick={() => setSort(sort === 'user_who' ? 'user_who desc' : 'user_who')}
                                    >Who</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Comment</th>
                                    <th></th>
                                    <th></th>
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
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.user_id}
                                                    onClick={HandleUser}>
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='edit__btn'
                                                    onClick={() => {
                                                        setId(e.user_id)
                                                        setFound(
                                                            {
                                                                name: e.user_name,
                                                                surname: e.user_surname,
                                                                age: e.user_age,
                                                                who: e.user_who,
                                                                phone: e.user_phone,
                                                            }
                                                        )
                                                        setEdit(!edit)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='delete__btn'
                                                    onClick={() => {
                                                        setId(e.user_id)
                                                        setDelModal(!delModal)
                                                    }}
                                                >
                                                    Delete
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
                                onClick={() => setOffset(Number(offset) - 50)}
                                disabled={offset === 0 ? true : false}
                            >Prev</button>
                            <button
                                className="next_btn add__btn"
                                onClick={() => setOffset(Number(offset) + 50)}
                                disabled={data.length >= 50 ? false : true}
                            >Next</button>
                        </div>

                        <div className={delModal ? "modal" : "modal--close"}>
                            <div className="modal__item" style={{ "maxWidth": "300px" }}>
                                <h4 style={{ "textAlign": "center", "marginBottom": "15px" }}>Do you want to delete this user</h4>
                                <div className={"pagination__btnbox"} style={{ "margin": "0 auto" }}>
                                    <button
                                        className="prev_btn add__btn"
                                        onClick={() => setDelModal(!delModal)}
                                    >Not</button>
                                    <button
                                        className="delete__btn"
                                        onClick={HandleDelete}
                                    >Yes</button>
                                </div>
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
                                            style={{ "display": "flex", "maxWidth": "200px", "justifyContent": "space-between" }}
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
                                <h2 style={{ "marginBottom": "10px" }}>User comment</h2>
                                <form onSubmit={AddComment}>
                                    <textarea
                                        cols={45}
                                        rows={5}
                                        style={{ "display": "block", "marginBottom": "20px", "padding": "10px", "fontSize": "17px" }}
                                        defaultValue={user ? user[0]?.user_comment : ""}
                                        name="comment"></textarea>
                                    <button style={{ "marginBottom": "10px" }} className='login__btn'>Save</button>
                                </form>
                                <button style={{ "marginBottom": "0px" }} className='login__btn' onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>
                    </div>


                    <div className={edit ? "modal" : "modal--close"}>
                        <div className='modal__item' >
                            <form onSubmit={HandlePut}>
                                <input className='login__phone__input app__input' type="text" name='name' placeholder='Name' defaultValue={found?.name} required />
                                <input className='login__phone__input app__input' type="text" name='surname' placeholder='Surname' defaultValue={found?.surname} required />
                                <div style={{ "width": "100%", "display": "flex", "justifyContent": "space-between", "marginBottom": "10px" }}>
                                    <input className='login__phone__input app__input' style={{ "width": "120px" }} type="number" name='age' placeholder='age' defaultValue={found?.age} required />
                                    <select name="who" style={{ "width": "100px", "padding": "10px" }} defaultValue={found?.who}>
                                        <option value="erkak">Erkak</option>
                                        <option value="ayol">Ayol</option>
                                    </select>
                                </div>
                                <input className='login__phone__input app__input' type="tel" name='phone' placeholder='phone' defaultValue={found?.phone} required />
                                <input className='login__phone__input app__input' type="tel" name='password' placeholder='password' />
                                <button style={{ "marginBottom": "10px" }} className='login__btn'>Edit</button>

                            </form>
                            <button style={{ "marginBottom": "0px" }} className='login__btn' onClick={() => setEdit(!edit)}>Close</button>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Users