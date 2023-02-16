import { Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import {Post}  from "../../../models/post";
import PostCreate from "../PostCreate/PostCreate";
import PostEdit from "../PostEdit/PostEdit";
// import { postSelectors, fetchBanoretAsync } from "../../../Pages/Catalog/CatalogSlice";
// import { useAppDispatch, useAppSelector } from "../../../Store/hook";
// import CreatePost from "../CreateTask/CreatePost";
// import PostPopup from "../ViewTask/PostPopup";
import "./task-list.scss";

const PostListt: React.FC = () => {
  // const posts = useAppSelector(postSelectors.selectAll);
  // const { postsLoaded} = useAppSelector(state => state.catalog);
  // const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

//   useEffect(() => {
//     if (!postsLoaded) dispatch(fetchBanoretAsync());
// }, [postsLoaded, dispatch])

  const handleDelete = (id: number) => {
    agent.Posts.deletePost(id)
    };


  useEffect(() => {
    agent.Posts.getPosts().then((response) => {
      setPosts(response);
    });
  }, []);

  return (
    <>
      <h1>Postat</h1>
      <button className="card-layout__add" onClick={handleOpen}>
        + Shto post
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>userId</TableCell>
              <TableCell>title</TableCell>
              <TableCell>body</TableCell>
              <TableCell>createdDate</TableCell>
              <TableCell>likes</TableCell>
              <TableCell>comments</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              posts?.map((post:Post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.userId}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>{post.createdDate}</TableCell>
                  <TableCell>{(post.likes).length}</TableCell>
                  <TableCell>{(post.comments).length}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(post.id)} variant="contained" startIcon={<Delete />}>Delete</Button>
                    <Button onClick={() => {
                      setSelectedPost(post);
                      setIsOpenpop(true);
                    }} variant="contained">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedPost &&
      
      <PostEdit
        isOpen={isOpenpop}
        setIsOpen={setIsOpenpop}
        post={selectedPost}
      />
      }
      <PostCreate setIsOpen={setIsOpen} isOpen={isOpen} /> 
    </>
  );
};

export default PostListt;
