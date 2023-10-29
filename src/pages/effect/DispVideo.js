import React, { useState } from 'react';
import axios from 'axios';

const ProcessedVideo = () => {
    const [processedVideoURL, setProcessedVideoURL] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const processVideo = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('video', selectedFile);

            try {
                const response = await axios.post('/api/process_video', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'blob', // Tell Axios to expect binary data
                });

                // Create a blob URL for the processed video
                const blob = new Blob([response.data], { type: 'video/mp4' });
                const url = URL.createObjectURL(blob);
                setProcessedVideoURL(url);
            } catch (error) {
                console.error('Error processing video:', error);
            }
        }
    };

    return (
        <div>
            <h2>Process and Display Video</h2>
            <input type="file" accept="video/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button onClick={processVideo}>Process Video</button>
            {processedVideoURL && (
                <video controls width="640" height="480">
                    <source src={processedVideoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default ProcessedVideo;
