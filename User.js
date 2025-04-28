const { doc: userDoc, setDoc: saveUser } = require("./firebase");

class User {
  constructor(id, name, email, createdBy) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.joinedSessions = [];
    this.createdBy = createdBy;
    this.createdDate = new Date();
    this.modifiedBy = null;
    this.modifiedDate = null;
  }

  joinSession(sessionId) {
    this.joinedSessions.push(sessionId);
    this.modifiedDate = new Date();
  }

  async saveToDB() {
    const ref = userDoc(db, "users", this.id);
    await saveUser(ref, this.toJSON());
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      joinedSessions: this.joinedSessions,
      createdBy: this.createdBy,
      createdDate: this.createdDate,
      modifiedBy: this.modifiedBy,
      modifiedDate: this.modifiedDate
    };
  }
}

class UserService {
  constructor() {
    this.users = new Map();
  }

  addUser(user) {
    this.users.set(user.id, user);
  }

  getUserById(id) {
    return this.users.get(id);
  }
}

module.exports = { User, UserService };
