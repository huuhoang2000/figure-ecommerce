type userRole = 'user' | 'admin' | 'guest';

export default class User {
//add type annotations for better type safety and autocompletion support 
  userid: string;
  username: string;
  email: string;
  password: string;
  role: userRole;
  isDeleted: boolean;

  constructor(userid: string, username: string, email: string, 
    password: string) {
    this.userid = userid;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = 'user';
    this.isDeleted = false;
  }
}
