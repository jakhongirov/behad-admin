import './users.scss'
import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';


import Header from "../header/header"
import Search from '../search/search';
import Close from '../../assets/image/close.svg'


function Users() {
    const [data, setData] = useState()
    const [token] = useToken()
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [deleted, setDelete] = useState(0)

    useEffect(() => {
        fetch('http://192.168.7.168:8000/api' + '/users?' + value + "=" + search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => data.status === 200 ? setData(data.data) : console.log(data))
            .catch((e) => console.log(e))
    }, [value, search, deleted])


    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch("http://192.168.7.168:8000/api" + '/deleteUser', {
            method: "Delete",
            body: JSON.stringify({
                id: id
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => data.status === 200 ? setDelete(deleted + 1) : console.log(data))
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
                    </div>
                </section>
            </main>
        </>
    )
}

export default Users