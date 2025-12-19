import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from './Questions';



const EditPage = () => {
  /* 
     Update initialization to expect 1-10 ints directly (or migrate old 0.x values?)
     For safety, if value < 1, assume it's old 0.x format and multiply by 10.
  */
  const [formData, setFormData] = useState(
    () => {
      const existingFormData = JSON.parse(localStorage.getItem('formData')) || {};
      return questions.reduce((acc, question) => {
        const getVal = (val) => {
          if (val === undefined) return 5;
          // Migration logic:
          // If val <= 1, it's likely old 0.x format => convert to 1-10
          // If val > 1, it's likely new 1-10 format => keep as is
          if (Number(val) <= 1) return Math.round(Number(val) * 10); // Return number
          return Number(val); // Ensure it's a number
        };
        acc[question.id] = {
          answer1: getVal(existingFormData[question.id]?.answer1),
          answer2: getVal(existingFormData[question.id]?.answer2),
        };
        return acc;
      }, {});
    }
  );

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (questionId, answerNumber, value) => {
    // Allow empty string to let user backspace
    if (value === '') {
      setFormData((prevData) => ({
        ...prevData,
        [questionId]: {
          ...prevData[questionId],
          [`answer${answerNumber}`]: '',
        },
      }));
      return;
    }

    const numberValue = Number(value);
    // Integer 1-10 validation
    if (!isNaN(numberValue) && Number.isInteger(numberValue) && numberValue >= 1 && numberValue <= 10) {
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
        answer1 === '' || answer2 === '' ||
        answer1 < 1 || answer1 > 10 ||
        answer2 < 1 || answer2 > 10
      ) {
        alert('Please ensure all answers are between 1 and 10.');
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    setIsVisible(false);

    // Save RAW 1-10 values to local storage now, so CalculateSimilarity handles the division uniformly
    localStorage.setItem('formData', JSON.stringify(formData));
    setTimeout(() => {
      navigate('/Results');
    }, 500);
  };

  return (
    <div className={isVisible ? 'visible' : 'hidden'}>
      <div className="editWrapper">
        <div className="editQuestions">
          {questions.map((question) => (
            <div key={question.id} className="question-container">
              <div className="question-title">{question.title}</div>
              <div className="input-container">
                <div className="input-group-edit">
                  <div className="input-wrapper-styled">
                    <input
                      type="text"
                      value={formData[question.id].answer1}
                      onChange={(e) => handleInputChange(question.id, 1, e.target.value)}
                      className="edit-input-field"
                      maxLength="2"
                      placeholder={question.placeHolderText1}
                    />
                  </div>
                </div>

                <div className="input-group-edit">
                  <div className="input-wrapper-styled">
                    <input
                      type="text"
                      value={formData[question.id].answer2}
                      onChange={(e) => handleInputChange(question.id, 2, e.target.value)}
                      className="edit-input-field"
                      maxLength="2"
                      placeholder={question.placeHolderText2}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <button className="editButtonSubmit" onClick={handleSubmit}>Submit</button>
      <style>
        {`
                body {
                    overflow: hidden;
                }
            `}
      </style>
    </div>
  );
};

export default EditPage;
