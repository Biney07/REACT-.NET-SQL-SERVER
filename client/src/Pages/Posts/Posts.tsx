
import React, { useEffect, useState } from "react";

import PostCard from "./PostCard";
import { Post } from "../../models/post";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPosts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get<Post[]>("https://localhost:7226/api/Posts");
          console.log(response);
          setPosts(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);
  
    return (
      <Container maxWidth="md">
         <Link to="/CreatePost">Create</Link>
        {loading ? (
          <CircularProgress />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Container>
    );
  };
  
  export default AllPosts;