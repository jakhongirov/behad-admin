import './login.scss'
import { useState } from 'react'
import useToken from '../../Hooks/useToken';

function Login() {
    const [, setToken] = useToken();
    const [err, setErr] = useState(false)

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { name, password } = e.target.elements

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            name: name.value.trim(),
            password: password.value.trim().toLowerCase(),
        });

        const requestOptions = {    
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://users.behad.uz/api/v1/admin', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 401) {
                    setErr(true)
                } else {
                    setToken(data.token)
                    setErr(false)
                }
            })
            .catch((error) => console.log('error', error))
    }

    return (
        <>
            <main className='main'>
                <section className='login'>
                    <div className='container'>
                        <div className='login__box'>
                            <form autoComplete='off' onSubmit={HandleSubmit}>
                                <h1 className='login__title'>Log in to continue</h1>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='name' type="text" name='name' required />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="name">
                                        Name
                                    </label>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Password
                                    </label>
                                </div>

                                <button className='login__btn'>Log In</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login