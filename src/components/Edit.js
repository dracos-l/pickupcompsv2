import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { questions } from './Questions';

const EditPage = () => {
  const [formData, setFormData] = useState(
    // Initialize form data with existing values if available
    () => {
      const existingFormData = JSON.parse(localStorage.getItem('formData')) || {};
      return questions.reduce((acc, question) => {
        acc[question.id] = {
          answer1: (existingFormData[question.id]?.answer1 * 100 || '').toFixed(0), // Multiply by 100 for display
          answer2: (existingFormData[question.id]?.answer2 * 100 || '').toFixed(0), // Multiply by 100 for display
        };
        return acc;
      }, {});
    }
  );

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (questionId, answerNumber, value) => {
    const numberValue = Number(value);
    if (numberValue >= 0 && numberValue <= 100 && !isNaN(numberValue)) {
      setFormData((prevData) => ({
        ...prevData,
        [questionId]: {
          ...prevData[questionId],
          [`answer${answerNumber}`]: value,
        },
      }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    for (const questionId in formData) {
        const { answer1, answer2 } = formData[questionId];
        if (
          answer1 === '' ||
          answer2 === '' ||
          isNaN(answer1) ||
          isNaN(answer2) ||
          answer1 < 0 ||
          answer1 > 100 ||
          answer2 < 0 ||
          answer2 > 100
        ) {
          alert('Please fill both answers with numbers between 0 and 100 for all sections.');
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        return;
      }
      
      setIsVisible(false);

    // Divide by 100 before saving to local storage
    const formDataInPercent = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        {
          answer1: value.answer1 / 100,
          answer2: value.answer2 / 100,
        },
      ])
    );
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formDataInPercent));
    // Navigate to the results page
    setTimeout(() => {
      navigate('/Results');
    }, 500);
  };

  return (
    <div className={isVisible ? 'visible' : 'hidden'}>
        <div className = "editWrapper">
            <div className = "editQuestions">
            {questions.map((question) => (
                <div key={question.id} className="question-container">
                <div className="question-title">{question.title}</div>
                <div className="input-container">
                <input
                    type="text"
                    value={formData[question.id].answer1}
                    onChange={(e) => handleInputChange(question.id, 1, e.target.value)}
                    placeholder={question.placeHolderText1}
                    className = "editInput1"
                />
                <input
                    type="text"
                    value={formData[question.id].answer2}
                    onChange={(e) => handleInputChange(question.id, 2, e.target.value)}
                    placeholder={question.placeHolderText2}
                    className = "editInput2"
                />
                </div>
                </div>
            ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
};

export default EditPage;
