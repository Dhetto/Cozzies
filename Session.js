const { doc: sessionDoc, setDoc: saveSession } = require("./firebase");

class Session {
  constructor(id, quizId, hostUserId, createdBy) {
    this.id = id;
    this.quizId = quizId;
    this.hostUserId = hostUserId;
    this.participants = [];
    this.status = "draft";
    this.waitingRoomEnabled = false;
    this.startTime = null;
    this.endTime = null;
    this.createdBy = createdBy;
    this.createdDate = new Date();
    this.modifiedBy = null;
    this.modifiedDate = null;
  }

  enableWaitingRoom() {
    this.waitingRoomEnabled = true;
    this.modifiedDate = new Date();
  }

  disableWaitingRoom() {
    this.waitingRoomEnabled = false;
    this.modifiedDate = new Date();
  }

  addParticipant(userId) {
    this.participants.push(userId);
    this.modifiedDate = new Date();
  }

  submitAnswer(userId, questionId, answer) {
    console.log(`${userId} answered ${answer} for question ${questionId}`);
  }

  end() {
    this.status = "ended";
    this.endTime = new Date();
    this.modifiedDate = new Date();
  }

  async saveToDB() {
    const ref = sessionDoc(db, "sessions", this.id);
    await saveSession(ref, this.toJSON());
  }

  toJSON() {
    return {
      id: this.id,
      quizId: this.quizId,
      hostUserId: this.hostUserId,
      participants: this.participants,
      status: this.status,
      waitingRoomEnabled: this.waitingRoomEnabled,
      startTime: this.startTime,
      endTime: this.endTime,
      createdBy: this.createdBy,
      createdDate: this.createdDate,
      modifiedBy: this.modifiedBy,
      modifiedDate: this.modifiedDate
    };
  }
}

module.exports = Session;
