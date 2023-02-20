import { useState, useEffect } from "react";
import useToken from '../../Hooks/useToken';

import PieChart from "../dashboards/pieChart";
import Header from "../header/header";
import BarChart from "../dashboards/barChart";

function Home() {
    const [data, setData] = useState([])
    const [survey, setSurvey] = useState([])
    const [surveyId, setSurveyId] = useState(0)
    const [userAge, setUserAge] = useState([])
    const [token, setToken] = useToken()
    const [appKey, setAppKey] = useState('')
    const [appCount, setAppCount] = useState('')
    const [app, setApp] = useState([])
    const [app_key, setKey] = useState('namoz_ilovasi')

    const Colors = 'Magenta,blue,green,yellow,orange,Gold,grey,cyan,pink,IndianRed,BlueViolet,LimeGreen,LightSeaGreen,Aqua'

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCountGender', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.count)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/survaysAdmin/data', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setSurvey(data.data)
                    setSurveyId(data.data[0]?.survay_id)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/userCountAge', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setUserAge(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/appUsersCount?sort=count desc', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
        
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    let appKey = []
                    let appCount = []

                    for (let i = 0; i < data.data.length; i++) {
                        appKey.push(data.data[i].app_key)
                        appCount.push(data.data[i].count)
                    }

                    setAppKey(appKey.join(','))
                    setAppCount(appCount.join(','))
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token])

    useEffect(() => {
        fetch('https://users.behad.uz/api/v1/appUsersCountGender?appKey=' + app_key, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setApp(data.data);
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token, app_key])

    return (
        <>
            <Header />
            <main className="main">
                <section className="home">
                    <div className="container ">
                        <h1 style={{ "textAlign": "center", "fontSize": "42px", "marginBottom": "20px" }}>Dashboards</h1>
                    </div>

                    <div className="container" style={{ "display": "flex", "maxWidth": "1400px", 'justifyContent': "space-between" }}>
                        <div>
                            <h2 style={{ "textAlign": "center", "fontSize": "36px", "marginBottom": "20px" }}>Users</h2>
                            <div style={{ "display": "flex", "alignItems": "center", 'width': "100%", 'maxWidth': "800px", "margin": "0 auto", "marginBottom": "20px" }}>
                                <PieChart label={'Male,Female'} colorChart={'Aqua,MediumVioletRed'} count={`${data[0]?.count},${data[1]?.count}`} />
                                <PieChart
                                    label={'0-15,16-25,26-40,41-60,61-80,80+'}
                                    colorChart={'#F49D1A,BlueViolet,yellow,green,grey,cyan'}
                                    count={
                                        `${userAge[15]?.counts},${userAge[25]?.count},${userAge[40]?.count},${userAge[60]?.count},${userAge[80]?.count},${userAge['unlimit']?.count}`
                                    } />
                            </div>
                        </div>

                        <div>
                            <h2 style={{ "textAlign": "center", "fontSize": "36px", "marginBottom": "20px" }}>Apps</h2>
                            <div style={{ "display": "flex", "alignItems": "center", 'width': "100%", 'maxWidth': "800px", "margin": "0 auto", "marginBottom": "20px" }}>
                                <PieChart label={appKey} colorChart={Colors} count={appCount} />
                                <div>
                                    <select
                                        name="app_key"
                                        defaultValue={appKey.split(',')[0]}
                                        onChange={(e) => setKey(e.target.value)}
                                        style={{
                                            "padding": "5px",
                                            "marginLeft": "70px",
                                            "marginBottom": "15px"
                                        }}
                                    >
                                        {
                                            appKey && appKey.split(',').map((e, i) => (
                                                <option key={i} value={e}>{e}</option>
                                            ))
                                        }
                                    </select>
                                    <PieChart label={'Male,Female'} colorChart={'Aqua,MediumVioletRed'} count={`${app[0]?.count},${app[1]?.count}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="container">
                        <h2 style={{ "textAlign": "center", "fontSize": "36px", "marginBottom": "20px" }}>Surveys</h2>
                        <select
                            style={{ "display": "block", "marginBottom": "30px", "padding": "10px" }}
                            onChange={(e) => setSurveyId(e.target.value) }
                            defaultValue={survey[0]?.survay_id}
                        >
                            {
                                survey && survey.map((e, i) => (
                                    <option key={i} value={e.survay_id}>{e.survay_title}</option>
                                ))
                            }
                        </select>
                        <BarChart surveyId={surveyId} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;