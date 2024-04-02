import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import {questions} from './Questions';

const MainPage = () => {
  const { questionTitle } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    questions.findIndex((question) => question.title === questionTitle)
  );
  const [formData, setFormData] = useState({
    answer1: '',
    answer2: '',
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);

  // Updated to enforce input constraints
  const handleInputChange = (answerNumber, value) => {
    const numberValue = Number(value);
    if (numberValue >= 0 && numberValue <= 100 && !isNaN(numberValue)) {
      setFormData((prevData) => ({
        ...prevData,
        [`answer${answerNumber}`]: value,
      }));
    }
  };

  // Added input validation before moving to the next question or finishing
  const handleNextClick = () => {
    // Check if both answers are valid
    if (
      formData.answer1 === '' ||
      formData.answer2 === '' ||
      isNaN(formData.answer1) ||
      isNaN(formData.answer2) ||
      formData.answer1 < 0 ||
      formData.answer1 > 100 ||
      formData.answer2 < 0 ||
      formData.answer2 > 100
    ) {
      alert('Please fill both answers with numbers between 0 and 100.');
      return;
    }

    setIsVisible(false);
    
    // Note: Convert answer values to 0-1 scale here before saving
    const scaledAnswers = {
      answer1: formData.answer1 / 100,
      answer2: formData.answer2 / 100,
    };

    // Save current question's answers to local storage
    const existingAnswers = JSON.parse(localStorage.getItem('formData')) || {};
    const updatedAnswers = {
      ...existingAnswers,
      [currentQuestion.id]: scaledAnswers,
    };
    localStorage.setItem('formData', JSON.stringify(updatedAnswers));
    
    // Reset formData for the next question
    setFormData({ answer1: '', answer2: '' });
  
    if (isLastQuestion) {
      setTimeout (() => {
        navigate('/Results');
      }, 500);
    } else {
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

  let placeholderText1 = '';
  let placeholderText2 = '';
  if (currentQuestion.id === 9 || currentQuestion.id === 10) {
    placeholderText1 = 'Volume';
    placeholderText2 = 'Deterrence';
  } else if (currentQuestion.id === 11) {
    placeholderText1 = 'Assist';
    placeholderText2 = 'Turnover';
  } else if (currentQuestion.id === 12) {
    placeholderText1 = 'Offensive';
    placeholderText2 = 'Defensive';
  } else {
    placeholderText1 = 'Volume';
    placeholderText2 = 'Efficiency';
  }


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
            placeholder={placeholderText1}
          />
        </div>

        {/* Answer Box 2 */}
        <div className="input-text">
          <input
            type="text"
            value={formData.answer2}
            onChange={(e) => handleInputChange(2, e.target.value)}
            placeholder={placeholderText2}
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
