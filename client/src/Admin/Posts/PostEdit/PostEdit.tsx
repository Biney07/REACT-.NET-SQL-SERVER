import React, { FormEvent, useState } from "react";
import agent from "../../../API/agent";
import { FormInput, FormInputUpdate } from "../../../Components/components/formComponents/FormComponents";
import "../../popup.scss";
import { Post } from "../../../models/post";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post ;
}

const PostEdit: React.FC<Props> = ({ setIsOpen, isOpen, post }) => {
  const [editedPost, setEditedPost] = useState<Post>({
    id: post.id,
    userId: post.userId,
    title: post.title ,
    body: post.body ,
    createdDate: post.createdDate,
    likes: post.likes,
    comments: post.comments
  });

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await agent.Posts.UpdatePost(post.id,editedPost);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup__inner">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <FormInputUpdate
            type="text"
            name="title"
            label="Title"
            placeholder=""
            value={editedPost.title}
            onChange={handleChange}
          />
          <FormInputUpdate
            type="text"
            name="body"
            label="Body"
            placeholder=""
            value={editedPost.body}
            onChange={handleChange}
          />
          <div className="popup__buttons">
            <button type="submit">Save</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PostEdit;
