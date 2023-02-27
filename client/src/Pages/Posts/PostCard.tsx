
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import agent from "../../API/agent";

import { Post } from "../../models/post";
import { User } from "../../models/user";

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [postUser, setPostUser] = useState<User | null>(null)
    const [commentUsers, setCommentUsers] = useState<User[]>([]);
    const [liked, setLiked] = useState(false);
    const handleCommentTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    useEffect(() => {
        agent.Account.getUserById(post.userId)
            .then((response) => {
                setPostUser(response);
            });
    }, []);

    useEffect(() => {
        Promise.all(
            post.comments.map((comment) =>
                agent.Account.getUserById(comment.userId)
            )
        )
            .then((users) => {
                setCommentUsers(users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post.comments]);


    const handleShowAllCommentsClick = () => {
        setShowAllComments(true);
    };
    const handleLikeClick = () => {
        const user = localStorage.getItem("user");

        if (user) {
            const userId = JSON.parse(user).id;

            if (!liked) {
                axios
                    .post(`https://localhost:7226/api/Likes/Like/${post.id}?userId=${userId}`)
                    .then((response) => {
                        console.log(`Liking post ${post.id}`);
                        setLiked(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                axios
                    .delete(`https://localhost:7226/api/Likes/Unlike/${post.id}/${userId}`)
                    .then((response) => {
                        console.log(`Unliking post ${post.id}`);
                        setLiked(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            console.log('User is not logged in');
        }
    };



    const handleCommentSubmit = () => {
        const user = localStorage.getItem("user");

        if (user) {
            const userId = JSON.parse(user).id;
            const requestBody = {
                content: commentText,
                createdDate: new Date(),
                userId: userId,
                postId: post.id
            }
            axios
                .post(`https://localhost:7226/api/Comments`, requestBody)
                .then((response) => {
                    console.log(`Commented on ${post.id}`);
                    setCommentText("");
                    window.location.reload(); // 
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('User is not logged in');
        }
    };
    return (
        <Card variant="outlined" style={{ margin: "10px", padding: "10px" }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {post.body}
                </Typography>
                <Typography variant="body2" component="p">
                    user id: {postUser?.id} | username: {postUser?.username}
                </Typography>
                <Typography variant="caption">{new Date(post.createdDate).toLocaleString()}</Typography>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Button
                        variant="contained"
                        color={liked ? "secondary" : "primary"}
                        onClick={handleLikeClick}
                    >
                        {liked ? "Liked!" : "Like"}
                    </Button>
                    <div>
                        <Button variant="contained" color="secondary" onClick={handleShowAllCommentsClick}>
                            View Comments ({post.comments.length})
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCommentSubmit} disabled={!commentText}>
                            Comment
                        </Button>
                    </div>
                </div>
                {showAllComments ? (

                    <div style={{ marginTop: "10px" }}>
                        {post.comments.map((comment, index) => (
                            <div key={comment.id} style={{ margin: "10px" }}>
                                <Typography variant="body2" component="p">
                                    user id: {commentUsers[index]?.id} | username: {commentUsers[index]?.username}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {comment.content}
                                </Typography>
                                <Typography variant="caption">{new Date(comment.createdDate).toLocaleString()}</Typography>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ marginTop: "10px" }}>
                        {post.comments.length > 0 && (
                            <div style={{ margin: "10px" }}>
                                <Typography variant="body2" component="p">
                                    user id: {commentUsers[0]?.id} | username: {commentUsers[0]?.username}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {post.comments[0].content}
                                </Typography>
                                <Typography variant="caption">{new Date(post.comments[0].createdDate).toLocaleString()}</Typography>
                            </div>
                        )}
                        {post.comments.length > 1 && (
                            <Button variant="contained" color="secondary" onClick={handleShowAllCommentsClick}>
                                View {post.comments.length - 1} more comments
                            </Button>
                        )}
                    </div>
                )}
                <div style={{ marginTop: "10px" }}>
                    <input type="text" placeholder="Add a comment..." value={commentText} onChange={handleCommentTextChange} />
                </div>
            </CardContent>
        </Card>
    );
};

export default PostCard;
