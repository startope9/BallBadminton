import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import './vidup.css'

const Vidupload = ({ option = 0 }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [processingMessage, setProcessingMessage] = useState('');
    const [processedVideoLink, setProcessedVideoLink] = useState('');

    useEffect(() => {
        setSelectedFile(null);
        setProcessedVideoLink('');
        setProcessingMessage('');
    }, [])


    const uploadVideo = async () => {
        if (selectedFile) {
            setProcessingMessage('Processing video...');

            const formData = new FormData();
            formData.append('video', selectedFile);

            try {
                await axios.post('http://localhost:5000/api/upload/' + option, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setProcessingMessage('Video uploaded. Processing...');

                // Set a timeout to simulate processing
                setTimeout(() => {
                    setProcessingMessage('Processing complete.');
                    setProcessedVideoLink(`http://localhost:5000/api/get_processed_video/${option}/processed_${selectedFile.name}`);
                }, 3000);
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    };

    return (
        <div>
            <div className='take-file'>
                <input type="file" accept="video/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button className='sub-file-video' onClick={uploadVideo}>Upload Video</button>
            </div>
            <h5>{processingMessage}</h5>
            {processedVideoLink && (
                <div className='processed'>
                    <div>Processed Video:
                        <a href={processedVideoLink} download>Download Processed Video</a>
                    </div>
                    <video controls width="640" height="480">
                        <source src={processedVideoLink} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );

};

export default Vidupload;
