export interface Login {
  token: any;
  id: number;
  name: string;
  email: string;
}

export interface User {
  token: any;
  id: number;
  name: string;
  email: string;
  gender: string;
  status: boolean;
}

export interface AddUser {
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface AddPost {
  user_id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface AddComment {
  post_id: number;
  user_id: number;
  name: string;
  email: string;
  body: string;
}