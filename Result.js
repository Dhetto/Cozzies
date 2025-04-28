const { doc: resultDoc, setDoc: saveResult } = require("./firebase");

class Result {
  constructor(id, userId, sessionId, createdBy) {
    this.id = id;
    this.userId = userId;
    this.sessionId = sessionId;
    this.answers = [];
    this.score = 0;
    this.submittedAt = new Date();
    this.createdBy = createdBy;
    this.createdDate = new Date();
    this.modifiedBy = null;
    this.modifiedDate = null;
  }

  addAnswer(answer) {
    this.answers.push(answer);
    if (answer.isCorrect) this.score += answer.points;
    this.modifiedDate = new Date();
  }

  calculateScore() {
    return this.score;
  }

  async saveToDB() {
    const ref = resultDoc(db, "results", this.id);
    await saveResult(ref, this.toJSON());
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      sessionId: this.sessionId,
      answers: this.answers.map(a => a.toJSON()),
      score: this.score,
      submittedAt: this.submittedAt,
      createdBy: this.createdBy,
      createdDate: this.createdDate,
      modifiedBy: this.modifiedBy,
      modifiedDate: this.modifiedDate
    };
  }
}

module.exports = Result;
