export interface Comment {
  _id:string;
  description: string;
  profile: {
    _id: string;
    name: string;
  };
}

export default interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
  image: boolean;
  comments: Comment[];
  likes: string[];
}
