export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static lastId = 3;
  
    static signUp(name, email, password) {
        const newUser = new UserModel(
            ++this.lastId,
            name,
            email,
            password,
        );
        
        users.push(newUser);

        return newUser;
    }
  
    static signIn(email, password) {
      const user = users.find(
        (user) =>
          user.email == email && user.password == password
      );

      return user;
    }
  
    static getAll() {
      return users;
    }

  }
  
  var users = [
    new UserModel("1", "User1", "user1@gmail.com", "Password1"),
    new UserModel("2", "User2", "user2@gmail.com", "Password2"),
    new UserModel("3", "User3", "user3@gmail.com", "Password3")
  ];