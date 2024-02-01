import React, {useState} from 'react';
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
    input: '',
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleInputChange = (value) => {
    setFormData({
      input: value,
    });
  };

  const handleNextClick = () => {
    // Do something with formData if needed
    console.log(`Answer to ${currentQuestion.text}:`, formData.input);

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Reset input field for the next question
    setFormData({
      input: '',
    });

  };

  return (
    <div class="formContainer">

      <div class = "formImage">
        <img src={currentQuestion.imageSrc} alt={`Question ${currentQuestion.id}`} />
      </div>

      <div class="text-boxes">
        <div class="question-text">{currentQuestion.questionText}</div>

        <div class="explanation-text">{currentQuestion.explanationText}</div>

        <div class="input-text">
          <input
            type="text"
            value={formData.input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter your answer"
          />
        </div>

        <div class="formButton">
          {isLastQuestion ? (
            <Link to="/results">
              <button>Finish</button>
            </Link>
          ) : (
            <button onClick={() => handleNextClick()}>
                Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default MainPage;
