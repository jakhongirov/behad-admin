import './users.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';


function Users() {
    const [data, setData] = useState()
    const [comment, setComment] = useState()
    const [token, setToken] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(0)


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

        fetch("https://users.behad.uz/api/v1/adminAddcommment", {
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
                                    <th>Phone</th>
                                    <th>Date</th>
                                    <th>Country</th>
                                    <th>Capital</th>
                                    <th>Comment</th>
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
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_country}</td>
                                            <td>{e.user_capital}</td>
                                            <td>{e.to_char}</td>
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
                            <div className='modal__item' style={{ "mwaxWidth": "800px" }}>
                                <h2 style={{ "marginBottom": "10px" }}>User comment</h2>
                                <form onSubmit={AddComment}>
                                    <textarea
                                        style={{ "display": "block", "width": "350px", "marginBottom": "20px", "padding": "10px", "fontSize": "17px" }}
                                        defaultValue={comment?.user_comment}
                                        name="comment"></textarea>
                                    <button style={{ "marginBottom": "10px" }} className='login__btn'>Save</button>
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

export default Users