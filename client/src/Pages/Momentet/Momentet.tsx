import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Close, PlayArrow } from '@mui/icons-material';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';

interface Moment {
    id: number;
    title: string;
    date: string;
    description: string;
    videoURL: string;
}

function Momentet() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [videoURL, setVideoUrl] = useState<string | undefined>(undefined);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        axios.get<Moment[]>('https://localhost:7226/api/Moments')
            .then(response => {
                setMoments(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handlePlayVideo = (videoURL: string) => {
        setVideoUrl(videoURL);
        setShowControls(true); // add this line to show the controls
    };

    const handleVideoEnd = () => {
        setVideoUrl(undefined);
    };

    const handleToggleControls = () => {
        setShowControls(!showControls);

    };

    return (
        <div className="row" style={{ marginRight: '2%', marginLeft: '2%', marginTop: '20px' }}>
            {moments.map(moment => (
                <div key={moment.id} className="col-md-4 col-xs-6 mb-3" style={{ marginBottom: '30px' }}>
                    <div className="card">
                        <div onClick={() => handlePlayVideo(moment.videoURL)} style={{ position: 'relative', cursor: 'pointer' }}>
                            <img src={`https://img.youtube.com/vi/${moment.videoURL.split('v=')[1]}/mqdefault.jpg`} className="card-img-top" alt={moment.title} style={{ width: '100%' }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <PlayArrow style={{ fontSize: 80, color: '#fff', textShadow: '2px 2px #000' }} />
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{moment.title}</h5>
                            <p className="card-text">{moment.description}</p>
                            <p className="card-text">
                                <small className="text-muted">{moment.date}</small>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {videoURL && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 999 }}>
                    <div style={{ position: "relative", margin: '25vh 0vh 0vh 55vh', paddingTop: "56.25%", overflow: "hidden", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "absolute", margin: '50vh', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <IconButton aria-label="play video" className="text-white" style={{ fontSize: 64, boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }} onClick={handleToggleControls}>
                                <PlayArrow />
                            </IconButton>
                            <div >

                                <IconButton
                                    aria-label="close video"
                                    className="text-white"
                                    style={{
                                        fontSize: 32,
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        margin: 16,
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                        zIndex: 1000, // add a higher z-index value
                                        transform: "translate(50%, -50%)" // move the button to the right side
                                    }}
                                    onClick={handleVideoEnd}
                                >
                                    <Close />
                                </IconButton>
                            </div>
                        </div>
                        {videoURL && (
                            <YouTube videoId={videoURL.split('v=')[1]} onEnd={handleVideoEnd} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }} />
                        )}
                    </div>
                </div>

            )}
        </div>
    );
}

export default Momentet;