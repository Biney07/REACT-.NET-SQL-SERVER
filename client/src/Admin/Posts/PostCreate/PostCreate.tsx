import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostForm: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleCreatePost = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    const postData = {
      userId: user.id,
      title,
      body,
      createdDate: new Date().toISOString(),
      likes: [],
      comments: []

    };

    axios.post('https://localhost:7226/api/Posts', postData)
      .then((response) => {
        console.log('Post created successfully');
        setTitle('');
        setBody('');
        history.push('/Posts');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [title, body, history]);

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  return isOpen ? (
    <>
      <div className="popup">

        <div className="popup__inner">
          <button className="popup__close-button" onClick={handleClose}>
            X
          </button>
          <h1>Shto postin</h1>
          <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              style={{ margin: "10px" }}
            />
            <TextField
              label="Body"
              variant="outlined"
              multiline
              rows={4}
              value={body}
              onChange={handleBodyChange}
              style={{ margin: "10px" }}
            />
            <Button variant="contained" color="primary" onClick={handleCreatePost} disabled={!title || !body} style={{ margin: "10px" }}>
              Create Post
            </Button>
          </form>
        </div>
      </div>
    </>
  ) : (<></>);
};

export default CreatePostForm;
