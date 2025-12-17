import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { questions } from './Questions';




const MainPage = () => {
  const { questionTitle } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    questions.findIndex((question) => question.title === questionTitle)
  );
  const [formData, setFormData] = useState({
    answer1: 5,
    answer2: 5,
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);

  // Updated to enforce input constraints (1-10 range for sliders)
  const handleInputChange = (answerNumber, value) => {
    const numberValue = Number(value);
    if (numberValue >= 1 && numberValue <= 10 && !isNaN(numberValue)) {
      setFormData((prevData) => ({
        ...prevData,
        [`answer${answerNumber}`]: numberValue,
      }));
    }
  };

  // Sync state with URL parameter (questionTitle)
  useEffect(() => {
    const newIndex = questions.findIndex((q) => q.title === questionTitle);
    if (newIndex !== -1) {
      setCurrentQuestionIndex(newIndex);
      setFormData({ answer1: 5, answer2: 5 });
      setIsVisible(true);
    }
  }, [questionTitle]);

  const handleNextClick = () => {
    // Save current question's answers to local storage (raw 1-10 values)
    const existingAnswers = JSON.parse(localStorage.getItem('formData')) || {};
    const updatedAnswers = {
      ...existingAnswers,
      [currentQuestion.id]: formData,
    };
    localStorage.setItem('formData', JSON.stringify(updatedAnswers));

    setIsVisible(false);

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        navigate('/Results', { state: formData });
      } else {
        navigate(`/Form/${questions[currentQuestionIndex + 1].title}`, { state: formData });
      }
    }, 500);
  };

  const handleBackClick = () => {
    setIsVisible(false);

    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        navigate(`/Form/${questions[currentQuestionIndex - 1].title}`);
      }
    }, 500);
  };


  return (
    <div className={isVisible ? 'visible' : 'hidden'}>
      <div className="formContainer">
        <div className="formImage">
          <img src={require(`${currentQuestion.imageSrc}`)} alt={`Question ${currentQuestion.id}`} />
        </div>

        <div className="text-boxes">
          <Link to={currentQuestion.titleLink} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            <div className="title-text">{currentQuestion.title}</div>
          </Link>

          <div className="typewriter-wrapper">
            <h1 className="typewriter-text line-1">{currentQuestion.questionText}</h1>
          </div>

          <div className="explanation-text">{currentQuestion.explanationText}</div>

          {/* Answer Box 1 */}
          <div className="input-range-wrapper">
            <div className="range-labels">
              <span>1 (Worst)</span>
              <span>10 (Best)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={formData.answer1 || 5}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="slider"
            />
            <div className="slider-value">Value: {formData.answer1 || 5}</div>
          </div>

          {/* Answer Box 2 */}
          <div className="input-range-wrapper">
            <div className="range-labels">
              <span>1 (Worst)</span>
              <span>10 (Best)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={formData.answer2 || 5}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="slider"
            />
            <div className="slider-value">Value: {formData.answer2 || 5}</div>
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
