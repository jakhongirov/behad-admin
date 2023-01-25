import './users.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';


function Users() {
    const [data, setData] = useState()
    const [comment, setComment] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('phone')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)
    const [found, setFound] = useState({})

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/users?' + value + "=" + search, {
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
    }, [value, search, token, deleted])

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

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
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    const HandleComment = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://users.behad.uz/api/v1/users?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setComment(data.data);
                    setShow(true)
                    setId(id)
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
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Age</th>
                                    <th>Who</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>Capital</th>
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
                                                    onClick={HandleComment}>
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
                                                    data-id={e.user_id}
                                                    onClick={HandleDelete}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>


                        <div className={show ? "modal" : "modal--close"}>
                            <div className='modal__item' style={{ "maxWidth": "500px" }}>
                                <h2 style={{ "marginBottom": "10px" }}>User comment</h2>
                                <form onSubmit={AddComment}>
                                    <textarea
                                        cols={45}
                                        rows={15}
                                        style={{ "display": "block", "marginBottom": "20px", "padding": "10px", "fontSize": "17px" }}
                                        defaultValue={comment[0]?.user_comment}
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