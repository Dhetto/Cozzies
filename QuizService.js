// QuizService.js
const { db, collection, doc, setDoc, getDoc, getDocs } = require("./firebase");
const Quiz = require("./Quiz");

class QuizService {
  constructor() {
    this.collectionName = "quizzes";
  }

  async addQuiz(quiz) {
    const ref = doc(db, this.collectionName, quiz.id);
    await setDoc(ref, quiz.toJSON());
    return quiz;
  }

  async getQuizById(id) {
    const ref = doc(db, this.collectionName, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      throw new Error("Quiz not found");
    }
    const data = snapshot.data();
    const quiz = new Quiz(data.id, data.title, data.description, data.createdBy);
    quiz.questions = data.questions.map(q => Object.assign({}, q)); // Simplified restore
    return quiz;
  }

  async getAllQuizzes() {
    const quizzes = [];
    const snapshot = await getDocs(collection(db, this.collectionName));
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const quiz = new Quiz(data.id, data.title, data.description, data.createdBy);
      quiz.questions = data.questions.map(q => Object.assign({}, q));
      quizzes.push(quiz);
    });
    return quizzes;
  }
}

module.exports = QuizService;
