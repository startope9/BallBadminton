
import { TextField, Typography, Fab, Button } from "@mui/material"
import './umpire.css'
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Common from "./Common";
import Nav from "./Nav";
// import e from "express";
import { useNavigate } from "react-router-dom";

export default function Umpire() {

    const [one, setOne] = useState('')
    const [two, setTwo] = useState('')
    const [three, setThree] = useState('')
    const [four, setFour] = useState('')
    const [five, setFive] = useState('')


    const [team1, setTeam1] = useState(0)
    const [team2, setTeam2] = useState(0)

    const [user, setUser] = useState([])


    const [hand1, setHand1] = useState(1)
    const [hand2, setHand2] = useState(1)

    const [arr1, setArr1] = useState([1])
    const [arr2, setArr2] = useState([1])


    const [matchNo, setMatchNo] = useState(0)
    const [disable, setDisable] = useState(false)

    const [old, setOld] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            await fetch('http://localhost:5000/getSessionInfo', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    setUser(res)
                    if (res.length === 0) navigate('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }, [navigate]);



    const handleOld = () => {
        document.getElementById('old-mat').style.display = 'block';
        document.getElementById('new-mat').style.display = 'none';
        (async () => {
            await fetch('http://localhost:5000/getAllMatches', {
                method: 'POST',
                headers: {
                    'Access-Control-Access-Origin': '*',
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    setOld(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }

    const handlNew = () => {
        document.getElementById('new-mat').style.display = 'block';
        document.getElementById('old-mat').style.display = 'none';
        setOld([]);
    }




    const handleTeam1 = () => {
        (
            async () => {
                await fetch('http://localhost:5000/team/1', {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        TeamName: team1Name,
                        Player1: one,
                        Player2: two,
                        Player3: three,
                        Player4: four,
                        Player5: five,
                        score: 0
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res === 200) {
                            document.getElementById('team-one-details').style.display = 'none';
                            document.getElementById('team-2').style.display = 'block';
                        }
                        if (res === 500) navigate('/')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )();
    }

    const handleTeam2 = () => {
        (
            async () => {
                await fetch('http://localhost:5000/team/2', {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        TeamName: team2Name,
                        Player1: one,
                        Player2: two,
                        Player3: three,
                        Player4: four,
                        Player5: five,
                        score: 0
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res === 200) {
                            document.getElementById('team-2').style.display = 'none';
                            document.getElementById('disp-det').style.display = 'block'
                        }
                        if (res === 500) navigate('/')

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )();
    }


    const handleTeam1Add = () => {
        let val = team1 + 1;
        setTeam1(val);
        sendServer('1', val)
    }
    const handleTeam1Sub = () => {
        let val = team1 - 1;
        setTeam1(val);
        sendServer('1', val)
    }
    const hanldeTeam2Add = () => {
        let val = team2 + 1;
        setTeam2(val);
        sendServer('2', val)
    }
    const handleTeam2Sub = () => {
        let val = team2 - 1;
        setTeam2(val);
        sendServer('2', val)
    }


    const sendServer = (teamNo, score) => {
        (async () => {
            await fetch('http://localhost:5000/score/' + teamNo, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    score: score
                })
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res === 500) navigate('/')

                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    };


    const handleHand1 = () => {
        let temp = hand1;
        temp += 1;
        if (temp > 5) temp = 1;
        setHand1(temp);
        arr1.push(temp);
        let temparr = arr1;
        setArr1(temparr);

        (async () => {
            await fetch('http://localhost:5000/uploadHead', {

                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    head1: temparr,
                    team: 1
                })

            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res === 500) navigate('/')

                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }

    const handleHand2 = () => {
        let temp = hand2;
        temp += 1;
        if (temp > 5) temp = 1;
        setHand2(temp);
        arr2.push(temp);
        let temparr = arr2;
        setArr2(temparr);

        (async () => {
            await fetch('http://localhost:5000/uploadHead', {

                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    head2: temparr,
                    team: 2
                })
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res === 500) navigate('/')

                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }

    const [alert, setAlert] = useState("can't be changed once submitted")


    const [team1Name, setTeam1Name] = useState('')
    const [team2Name, setTeam2Name] = useState('')

    return (
        <div>

            <Nav value={1} />

            <Common />

            <center style={{ 'marginBottom': '5%' }}>
                <Typography variant="h4">Welcome {user[0]}</Typography>
                <div className="umpire-option">
                    <button onClick={handleOld}>Old Matches</button>
                    <button onClick={handlNew}>New Matches</button>
                </div>
            </center>
            <div id="old-mat" style={{ 'display': 'none' }} >
                {old.map((element) => (
                    <div id={old.indexOf(element)} >
                        <fieldset className="field-adjust">
                            <legend style={{ 'fontSize': '25px', 'letterSpacing': '1px' }}>{element[0]}</legend>
                            <div className="all-matches">
                                <div className="disp-score">
                                    <div className="team1">
                                        <center>
                                            <div style={{ 'fontSize': '25px' }}>{element[1]}</div>
                                            <div style={{ 'fontFamily': 'cursive', 'fontSize': '22px', }}>{element[2]}</div></center>
                                    </div>
                                    <div>v/s</div>
                                    <div>
                                        <center className="team2">

                                            <div style={{ 'fontSize': '25px' }}>{element[3]}</div>
                                            <div style={{ 'fontFamily': 'cursive', 'fontSize': '22px' }}>{element[4]}</div>
                                        </center>
                                    </div>
                                </div>
                                <div className="conc-score">
                                    <center>
                                        {element[2] > element[4] ? `Match won by ${element[1]}` : `match won by ${element[3]}`}
                                    </center>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                ))}
            </div>
            <div id="new-mat" style={{ 'display': 'none', 'marginBottom': '5%' }}>

                <center className="team-1" id="team-1">

                    <div style={{ 'marginBottom': '15px' }}>
                        <TextField label='MatchNo' variant="outlined" helperText={alert} id="match-no" disabled={disable} value={matchNo}
                            onChange={(e) => {
                                setMatchNo(e.target.value)
                            }}
                            InputProps={{
                                endAdornment:
                                    <Button variant="contained" style={{ 'backgroundColor': '#151E11' }}
                                        onClick={() => {
                                            (async () => {
                                                await fetch('http://localhost:5000/number', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Access-Control-Allow-Origin': '*',
                                                        'Content-type': 'application/json'
                                                    },
                                                    credentials: 'include',
                                                    body: JSON.stringify({
                                                        number: matchNo
                                                    })
                                                })
                                                    .then(res => res.json())
                                                    .then((res) => {
                                                        console.log(res)
                                                        if (res === 300) {
                                                            setAlert('already exists!');
                                                        }
                                                        if (res === 200) {
                                                            setDisable(true);
                                                            setAlert('successful')
                                                        }
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            })();
                                        }}

                                    >Submit</Button>
                            }}
                        />
                    </div>


                    <div id='team-one-details'>
                        <TextField label='Team1 name' onChange={(e) => setTeam1Name(e.target.value)} />
                        <h3>Team 1 players:</h3>
                        <div className="contain-common">
                            <TextField label='player 1' onChange={(e) => setOne(e.target.value)} />
                            <TextField label='player 2' onChange={(e) => setTwo(e.target.value)} />
                            <TextField label='player 3' onChange={(e) => setThree(e.target.value)} />
                            <TextField label='player 4' onChange={(e) => setFour(e.target.value)} />
                            <TextField label='player 5' onChange={(e) => setFive(e.target.value)} />
                        </div>
                        <button style={{ 'marginTop': '2%' }} onClick={handleTeam1} className="sub-but">Submit</button>
                    </div>
                </center>

                <center className="team-2" id="team-2" style={{ 'display': 'none', 'marginBottom': '5%' }}>
                    <TextField label='Team2 name' onChange={(e) => setTeam2Name(e.target.value)} />
                    <h3>Team 2 players:</h3>
                    <div className="contain-common">
                        <TextField label='player 1' onChange={(e) => setOne(e.target.value)} />
                        <TextField label='player 2' onChange={(e) => setTwo(e.target.value)} />
                        <TextField label='player 3' onChange={(e) => setThree(e.target.value)} />
                        <TextField label='player 4' onChange={(e) => setFour(e.target.value)} />
                        <TextField label='player 5' onChange={(e) => setFive(e.target.value)} />
                    </div>

                    <button style={{ 'marginTop': '2%' }} onClick={handleTeam2} className="sub-but">Submit</button>
                </center>
            </div>
            <center>

                <div className="disp-det" id="disp-det" style={{ 'marginBottom': '5%', 'display': 'none' }}>

                    <div className="team1-det">
                        <label>{team1Name}</label>
                        <div>
                            <TextField className="team1-score" disabled value={team1}
                                InputProps={{
                                    startAdornment: <Fab color="primary" onClick={handleTeam1Add} className="icon"><AddIcon /></Fab>,
                                    endAdornment: <Fab color="primary" onClick={handleTeam1Sub} className="icon"><RemoveIcon /></Fab>,
                                }}
                            />
                        </div>
                        <div className="next-hand-serve">
                            <div className="start">
                                <div className="suggest">Hand Table:</div>
                                {arr1.length && arr1.map((element) => (
                                    <div key={arr1.indexOf(element)} className="table-type">
                                        {element}
                                    </div>
                                ))}
                            </div>
                            <div className="next-hand-change">
                                <div>Next Hand:</div>
                                <Fab color="primary" className="icone" size="small" onClick={handleHand1}>{hand1}</Fab>
                            </div>
                        </div>
                    </div>

                    <div className="team2-det">
                        <label>{team2Name}</label>
                        <div>
                            <TextField className="team2-score" disabled value={team2}
                                InputProps={{
                                    startAdornment: <Fab color="primary" onClick={hanldeTeam2Add} className="icon"><AddIcon /></Fab>,
                                    endAdornment: <Fab color="primary" onClick={handleTeam2Sub} className="icon"><RemoveIcon /></Fab>,
                                }}
                            />
                        </div>
                        <div className="next-hand-serve">
                            <div className="start">
                                <div className="suggest">Hand Table:</div>
                                {arr2.length && arr2.map((element) => (
                                    <div key={arr2.indexOf(element)} className="table-type">
                                        {element}
                                    </div>
                                ))}
                            </div>
                            <div className="next-hand-change">
                                <div>Next Hand:</div>
                                <Fab color="primary" className="icone" size="small" onClick={handleHand2}>{hand2}</Fab>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" style={{ 'backgroundColor': '#b2dcf8', 'width': '30%', 'marginBottom': '20px' }}

                            onClick={() => {
                                (async () => {
                                    await fetch('http://localhost:5000/finish_match', {
                                        method: 'POST',
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                        },
                                        credentials: 'include',
                                    })
                                        .then(res => res.json())
                                        .then((res) => {
                                            console.log(res)
                                            if (res === 200) {
                                                document.getElementById('disp-det').style.display = 'none';
                                                document.getElementById('team-1').style.display = 'none'
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                })();
                            }}

                        >

                            Finish</Button>
                    </div>


                </div>

            </center>

        </div>
    )
}


