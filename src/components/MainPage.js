import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const questions = [
    {
      id: 1,
      questionText: 'Question 1: Describe something',
      explanationText: 'Explanation for question 1',
      imageSrc: 'path_to_image_1.jpg',
    },
    {
      id: 2,
      questionText: 'Question 2: Explain another thing',
      explanationText: 'Explanation for question 2',
      imageSrc: 'path_to_image_2.jpg',
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    answer1: '',
    answer2: '', // Add another answer field
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleInputChange = (answerNumber, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`answer${answerNumber}`]: value,
    }));
  };

  const handleNextClick = () => {
    // Do something with formData if needed
    console.log(`Answers to ${currentQuestion.questionText}:`, formData.answer1, formData.answer2);

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Reset input fields for the next question
    setFormData({
      answer1: '',
      answer2: '',
    });
  };

  return (
    <div className="formContainer">
      <div className="formImage">
        <img src={currentQuestion.imageSrc} alt={`Question ${currentQuestion.id}`} />
      </div>

      <div className="text-boxes">
        <div className="question-text">{currentQuestion.questionText}</div>
        <div className="explanation-text">{currentQuestion.explanationText}</div>

        {/* Answer Box 1 */}
        <div className="input-text">
          <input
            type="text"
            value={formData.answer1}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder="Enter your answer 1"
          />
        </div>

        {/* Answer Box 2 */}
        <div className="input-text">
          <input
            type="text"
            value={formData.answer2}
            onChange={(e) => handleInputChange(2, e.target.value)}
            placeholder="Enter your answer 2"
          />
        </div>

        <div className="formButton">
          {isLastQuestion ? (
            <Link to="/results">
              <button onClick={handleNextClick}>Finish</button>
            </Link>
          ) : (
            <button onClick={handleNextClick}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
