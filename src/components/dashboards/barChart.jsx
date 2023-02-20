import React, { useEffect, useState } from 'react';
import useToken from '../../Hooks/useToken';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ surveyId }) {
    const labels = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'commet 0'];
    const [token, setToken] = useToken()
    const [survey, setSurvey] = useState({})
    const [answer, setAnswer] = useState([])
    const [dataChart, setDataChart] = useState({
        labels,
        datasets: [
            {
                label: 'options',
                data: labels.map((e) => e.split(' ').includes('0') ? 200 : 100),
                backgroundColor: '#007FFF',
            },
        ],
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Survey answer graph',
            },
        },
    };

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/survays?id=' + surveyId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setSurvey(data.data[0])
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token, surveyId])

    useEffect(() => {
        fetch('https://survey.behad.uz/api/v1/answersCount?surveyId=' + surveyId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setAnswer(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token, surveyId])

    useEffect(() => {
        const data = {
            labels,
            datasets: [
                {
                    label: 'options',
                    data: labels.map((e) => {
                        if (survey?.survay_v6_comment) {
                            for (let i = 0; i < answer.length; i++) {
                                if (e.split(' ').includes(`${answer[i].survay_answer == 0 ? 6 : answer[i].survay_answer}`)) {
                                    return answer[i].count
                                }
                            }
                        } else {
                            for (let i = 0; i < answer.length; i++) {
                                if (e.split(' ').includes(`${answer[i].survay_answer}`)) {
                                    return answer[i].count
                                }
                            }
                        }
                    }),
                    backgroundColor: '#007FFF',
                },
            ],
        }

        setDataChart(data)
    }, [survey, answer])

    return (
        <>
            <div style={{ "width": "100%", "maxWidth": "800px" }}>
                <Bar options={options} data={dataChart} />
            </div>
        </>
    )
}

export default BarChart