import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import {questions} from './Questions';

const MainPage = () => {

  const { questionTitle } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    // Find the index of the question with the matching title
    questions.findIndex(question => question.title === questionTitle)
  );
  const [formData, setFormData] = useState({
    answer1: '',
    answer2: '', // Add another answer field
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);

  const handleInputChange = (answerNumber, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`answer${answerNumber}`]: value,
    }));
  };

  const handleNextClick = () => {
    setIsVisible(false);
    
    // Move to the next question
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 500);

    // Reset input fields for the next question
    setFormData({
      answer1: '',
      answer2: '',
    });

    

    if (isLastQuestion) navigate('/Results');
    else{
      setTimeout(() => {
        navigate(`/Form/${questions[currentQuestionIndex + 1].title}`);
        window.location.reload();
      }, 500);
    } 
  };

  const handleBackClick = () => {
    setIsVisible(false);

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }, 500);
    
    setFormData({
      answer1: '',
      answer2: '',
    });

    

    setTimeout(() => {
      navigate(`/Form/${questions[currentQuestionIndex - 1].title}`);
      window.location.reload();
    }, 500);

  };

  return (
    <div className={isVisible ? 'visible' : 'hidden'}>
    <div className="formContainer">
      <div className="formImage">
        <img src={currentQuestion.imageSrc} alt={`Question ${currentQuestion.id}`} />
      </div>

      <div className="text-boxes">
        <Link to={currentQuestion.titleLink} style={{ textDecoration: 'none' }} target="_blank">
          <div className="title-text">{currentQuestion.title}</div>
        </Link>

        <div class="typewriter-wrapper">
          <h1 class="typewriter-text line-1">{currentQuestion.questionText}</h1>
        </div>

        <div className="explanation-text">{currentQuestion.explanationText}</div>

        {/* Answer Box 1 */}
        <div className="input-text">
          <input
            type="text"
            value={formData.answer1}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder="Volume"
          />
        </div>

        {/* Answer Box 2 */}
        <div className="input-text">
          <input
            type="text"
            value={formData.answer2}
            onChange={(e) => handleInputChange(2, e.target.value)}
            placeholder="Efficiency"
          />
        </div>

        <div className="formButton">
          {!isFirstQuestion && <button onClick={handleBackClick}>Prev</button>}

          {isLastQuestion ? (
            <button onClick={handleNextClick}>Finish</button>
          ) : (
            <button onClick={handleNextClick}>Next</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MainPage;
