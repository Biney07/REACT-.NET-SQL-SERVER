
export interface Post {
    id: number;
    userId: number; 
    title: string;
    body: string;
    createdDate: string; // ISO 8601 format string
    likes: PostLike[];
    comments: PostComment[];
  }
  
  export interface PostLike {
    id: number;
    createdDate: string; // ISO 8601 format string
    userId: number;
    postId: number;
  }
  
  export interface PostComment {
    id: number;
    content: string;
    createdDate: string; // ISO 8601 format string
    userId: number;
    postId: number;}