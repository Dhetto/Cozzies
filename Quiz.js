const { db, doc, setDoc } = require("./firebase");

class Quiz {
  constructor(id, title, description, createdBy) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.questions = [];
    this.createdBy = createdBy;
    this.createdDate = new Date();
    this.modifiedBy = null;
    this.modifiedDate = null;
  }

  addQuestion(question) {
    this.questions.push(question);
    this.modifiedDate = new Date();
  }

  importQuestions(questionList) {
    questionList.forEach(q => this.questions.push(q));
    this.modifiedDate = new Date();
  }

  getQuestions() {
    return this.questions;
  }

  async saveToDB() {
    const ref = doc(db, "quizzes", this.id);
    await setDoc(ref, this.toJSON());
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      questions: this.questions.map(q => q.toJSON()),
      createdBy: this.createdBy,
      createdDate: this.createdDate,
      modifiedBy: this.modifiedBy,
      modifiedDate: this.modifiedDate
    };
  }
}

module.exports = Quiz;
