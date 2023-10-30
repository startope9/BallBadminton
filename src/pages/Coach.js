
import { Typography } from "@mui/material"
import './coach.css'
import Common from "./Common"
import Nav from "./Nav"
import { useEffect, useState } from "react"
// import Vidupload from "./effect/Vidupload"
import { useNavigate } from "react-router-dom"

import axios from 'axios';

import './vidup.css'


export default function Coach() {

    const [selectedopt, setSelectedopt] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);
    const [processingMessage, setProcessingMessage] = useState('');
    const [processedVideoLink, setProcessedVideoLink] = useState('');

    const [user, setUser] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            await fetch('https://bbserver.onrender.com/getSessionInfo', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://bbserver.onrender.com',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    setUser(res)
                    if (res.length === 0) navigate('/#user-options')
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }, [navigate]);



    const resetState = () => {
        // setSelectedFile(null);
        setProcessedVideoLink('');
        setProcessingMessage('');
        (async () => {
            await fetch('https://bbserver.onrender.com/remove_dir', {
                method: 'POST',
                headers: {
                    'Access-Control-Access-Origin': 'https://bbserver.onrender.com',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res === 500) navigate('/')

                }).catch((err) => {
                    console.log(err)
                })
        })();
    }

    const uploadVideo = async () => {
        if (selectedFile) {
            setProcessingMessage('Processing video...');

            const formData = new FormData();
            formData.append('video', selectedFile);

            try {
                await axios.post('https://bbserver.onrender.com/api/upload/' + selectedopt, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': 'https://bbserver.onrender.com',
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });
                setProcessingMessage('Video uploaded. Processing...');

                // Set a timeout to simulate processing
                setTimeout(() => {
                    setProcessingMessage('Processing complete.');
                    setProcessedVideoLink(`https://bbserver.onrender.com/api/get_processed_video/${user[0]}/${selectedopt}/processed_${selectedFile.name}`);
                }, 3000);
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    };


    return (
        <div>

            <Nav value={1} />

            <Common />

            <center style={{ 'marginBottom': '10%', 'marginTop': '3%' }}>
                <Typography variant="h4">Welcome {user[0]}</Typography>
                <div className="coach-option">
                    <button onClick={() => { setSelectedopt(1); resetState() }}>Speed Tracking</button>
                    <button onClick={() => { setSelectedopt(2); resetState() }}>Ball Tracking</button>
                    <button onClick={() => { setSelectedopt(3); resetState() }}>Pose Estimation</button>
                    <button onClick={() => { setSelectedopt(4); resetState() }}>Court and Player Position</button>
                </div>


                {selectedopt === 1 ?

                    (<center>
                        <h3>Player Speed Tracking!</h3>
                    </center>)

                    :
                    selectedopt === 2 ?

                        (<center>
                            <h3>Ball Tracking</h3>
                        </center>)

                        :
                        selectedopt === 3 ?
                            (<center>
                                <h3 >Pose Estimation</h3>
                            </center>)
                            :
                            selectedopt === 4 ?
                                (<div>
                                    <h3>Court and Player Position</h3>
                                </div>)
                                :
                                'select one of the above option'}


                {selectedopt !== 0 ?
                    <div>
                        <div className='take-file'>
                            <input type="file" accept="video/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <button className='sub-file-video' onClick={uploadVideo}>Upload Video</button>
                        </div>
                        <h5>{processingMessage}</h5>
                        {processedVideoLink && (
                            <div className='processed'>
                                {/* <div>Processed Video:
                                    <a href={processedVideoLink} target="_blank" download>Download Processed Video</a>
                                </div> */}
                                <video controls width="640" height="480">
                                    <source src={processedVideoLink} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                        )}
                    </div>
                    :
                    ''
                }

            </center>
        </div>
    )
}

