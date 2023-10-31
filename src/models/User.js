export default class User {
  constructor(userid, username, email, password, name, phone, address) {
    this.userid = userid;
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.role = 'user';
    this.isDeleted = false;
  }
}
