import { useEffect, useState } from "react"
import './fan.css'
import Common from "./Common";
import Nav from "./Nav";
import { Typography } from "@mui/material";

export default function Fan() {

    const [score, setScore] = useState([])


    const [head1, setHead1] = useState(1)
    const [head2, setHead2] = useState(1)

    const [team1Name, setTeam1Name] = useState('')
    const [team2Name, setTeam2Name] = useState('')

    useEffect(() => {

        (async () => {
            await fetch('https://bbserver.onrender.com/getLiveScore', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://bbserver.onrender.com/',
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res.length)

                    if (res[0].length === 5) {
                        setScore(res);
                    }
                    else {
                        console.log(res)
                        setScore(res);
                        setColor(res[6], res[7]);
                        setHead1(res[2]);
                        setHead2(res[5]);
                        setTeam1Name(res[1]);
                        setTeam2Name(res[4]);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    });


    const setColor = (firstColorPercentage, secondColorPercentage) => {
        // Set the percentages for each color segment
        // Get the progress-segment elements
        if (score.length !== 5) {
            const progressSegments = document.querySelectorAll(".progress-segment");

            // Set the width of each progress-segment element
            progressSegments[0].style.width = firstColorPercentage + "%";
            progressSegments[1].style.width = secondColorPercentage + "%";
        }
    }


    return (
        <div>

            <Nav />

            <Common />

            <center >
                <Typography style={{ 'marginTop': '2%' }} variant="h4">Current Match Score</Typography>
                <div className="to-add-bg">
                    <div className="main-res-disp">
                        <div className="team1-res">
                            <label>{team1Name}</label>
                            <div>{score[0]}</div>
                            <br />
                            <br />
                            {score.length === 5 ? '' :
                                <div id="head-disp">Head: <span>{head1}</span></div>}
                        </div>
                        <div className="midd">v/s</div>
                        <div className="team2-res">
                            <label>{team2Name}</label>
                            <div>{score[3]}</div>

                            <br />
                            <br />
                            {score.length === 5 ? '' :

                                <div id="head-disp">Head: <span>{head2}</span></div>}

                        </div>
                    </div>

                    <div style={{ 'paddingBottom': '30px' }}>

                        {score.length === 5 ?

                            <div>
                                Match won by {score[0] > score[3] ? <span>{team1Name}</span> : <span>{team2Name}</span>}
                            </div>

                            :
                            <div>
                                <h3>Win Probability %</h3>
                                <div className="disp-prob">
                                    <div>{score[6]}%</div>
                                    <div className="progress-bar">
                                        <div className="progress-segment right" style={{ 'backgroundColor': '#FF5733' }}></div>
                                        <div className="progress-segment left" style={{ 'backgroundColor': '#33FF6E' }}></div>
                                    </div>
                                    <div>{score[7]}%</div>
                                </div>
                            </div>}

                    </div>
                </div>
            </center>

            <div className="quiz-opt">
                <a href="https://quizizz.com/embed/quiz/653d4fd7aaa40a3d59b86ff4" target="_blank">
                    <div>Quiz</div>
                </a>
            </div>

        </div>
    )
}