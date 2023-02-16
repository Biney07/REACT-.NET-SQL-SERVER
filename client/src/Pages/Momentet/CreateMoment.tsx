import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize, Typography, Grid } from '@mui/material';

interface Moment {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    date: string;
}

function CreateMoment() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get<Moment[]>('https://localhost:7226/api/moments')
            .then(response => {
                setMoments(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function handleVideoUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        setVideoUrl(event.target.value);
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    function handleCreateMoment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newMoment: Moment = {
            id: moments.length + 1,
            title,
            description,
            videoUrl,
            date
        };

        axios.post<Moment>('https://localhost:7226/api/moments', newMoment)
            .then(response => {
                alert(response.data);
                setMoments([...moments, newMoment]);
                setTitle('');
                setDescription('');
                setVideoUrl('');
                setDate('');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h1">Moments</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" component="h2">Create Moment</Typography>
                <form onSubmit={handleCreateMoment}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={handleTitleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                aria-label="description"
                                placeholder="Description"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Video URL"
                                variant="outlined"
                                value={videoUrl}
                                onChange={handleVideoUrlChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                variant="outlined"
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">Create Moment</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>


    );
}

export default CreateMoment;
