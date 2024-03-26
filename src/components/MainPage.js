import React, { useState,  } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';

const MainPage = () => {
  const questions = [
    {
      "id": 1,
      "title": "Paint",
      "titleLink": "https://youtu.be/3VlMSo7AXow?si=HsQHnOMRw-37Di2N",
      "questionText": "What is your volume and efficiency in the Paint?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many shots you take in the paint and how efficient you are at making them? (Use the visual to see what’s a paint shot)",
      "exampleText": "For example, I am not as good around the basketball and, therefore, I don’t take many shots in the paint, so I’m probably below 30% for both.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/layup-locations.jpg"
    },
    {
      "id": 2,
      "title": "Midrange",
      "titleLink": "https://youtu.be/E0AlcYPP-JA?si=uV3y32o5dITYBanI",
      "questionText": "What is your volume and efficiency for Midrange shots?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many mid range shots you take and how efficient you are at making them? (Use the visual to see what’s a mid range shot)",
      "exampleText": "For example, I take a decent amount of mid range shooters but I am probably a little streaky than most. So, I’m probably around 50% for volume but lower when it comes to efficiency.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/midrange-locations.jpg"
    },
    {
      "id": 3,
      "title": "Corner",
      "titleLink": "https://youtu.be/tr6XsZVb-ZE?si=9KU_qXeHiO1OiBRl",
      "questionText": "What is your volume and efficiency for Corner three-pointers?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many corner three-pointers you take and how efficient you are at making them? (Use the visual to see what’s a corner shot)",
      "exampleText": "For example, I barely take any corner threes but I am definitely not the worst corner three shooter. So, I’m probably around 20% for volume and 30% for efficiency.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/corner-locations.jpg"
    },
    {
      "id": 4,
      "title": "Above-the-Break",
      "titleLink": "https://youtu.be/RxxueDqPAyU?si=h8KJ0_z4rB84p5K5",
      "questionText": "What is your volume and efficiency for Above the Break three-pointers?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many above the break three-pointers you take and how efficient you are at making them? (Use the visual to see what’s an above the break shot)",
      "exampleText": "For example, this is my favorite shot in basketball. I think I honestly might be in the 90 - 100% in volume and, while I am not the best shooter, I’d still say I am above average around 70%",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/above-the-break-locations.jpg"
    },
    {
      "id": 5,
      "title": "Tight",
      "titleLink": "https://youtu.be/KlXSt9Wmx88?si=ynK-5Sg8vfSMEnuL",
      "questionText": "What is your volume and efficiency for Tight shots?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many tight shots you take and how efficient you are at making them? A tight shot is defined as a shot where the nearest defender is less than 4 feet from you.",
      "exampleText": "For example, I don’t rise up that high on my shots which makes it pretty easy to deter when people are up close. So, I am probably 30% in volume and around 20% in efficiency.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/tight-locations.jpg"
    },
    {
      "id": 6,
      "title": "Open",
      "titleLink": "https://youtu.be/RFAVn-NEzdo?si=4U47tsBaQocB70Ww",
      "questionText": "What is your volume and efficiency for Open shots?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many open shots you take and how efficient you are at making them? An open shot is defined as a shot where the nearest defender is more than 4 feet from you.",
      "exampleText": "For example, I run around the court a lot and set and use a lot of screens; I also run the fast break a lot. So, I’m probably around 80% in volume and pretty average of an overall shooter so around 50%.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/open-locations.jpg"
    },
    {
      "id": 7,
      "title": "Catch-and-Shoot",
      "titleLink": "https://youtu.be/D8-ZoeXAkD4?si=xaw5dZGYEanzCdK_",
      "questionText": "What is your volume and efficiency for Catch and Shoot shots?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many catch and shoot shots you take and how efficient you are at making them? A catch and shoot shot is defined as a shot at least 10 feet from the basket off the catch. (Use the visual to see what’s a catch and shoot shot)",
      "exampleText": "For example, when I shoot it is usually coming from an off ball situation and I am definitely better off the catch. I would say I’m around 70% in volume and 60% in efficiency.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/catch-and-shoot-locations.jpg"
    },
    {
      "id": 8,
      "title": "Pull-Up",
      "titleLink": "https://youtu.be/GEMVGHoenXM?si=lqG3OTcr3n6OoKgk",
      "questionText": "What is your volume and efficiency for Pull Up shots?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many pull up shots you take and how efficient you are at making them? A pull up jumper is defined as a shot at least 10 feet from the basket off the dribble. (Use the visual to see what’s a pull up jumper)",
      "exampleText": "For example, I run into a similar problem with pull ups as I do with tight shots. While I sometimes get to it, it really isn’t my shot. So, I am probably 20% in volume and 30% in efficiency.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/pull-up-locations.jpg"
    },{
      "id": 9,
      "title": "Paint-Defense",
      "titleLink": "https://youtu.be/moBoVmPozXw?si=Fs5JY2wfOhsoUZnU",
      "questionText": "What is your volume and deterrence in Paint defense?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many shots you defend in the paint and how effective you are at stopping them? Take into account that paint deterrence doesn’t equal blocks, but is more about how you affect scorers. Also, sometimes the best paint defenders are avoided and the worst defenders are targeted: though, this doesn’t always happen in pickup. (Use the visual to see what’s paint defense)",
      "exampleText": "For example, I am not that tall and do not jump that high, so I try my best to not be alone in the paint. So, I am probably 40% in volume and 30% in deterrence.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/layup-locations.jpg"
    },
    {
      "id": 10,
      "title": "Perimeter",
      "titleLink": "https://youtu.be/3cM_tUrErIg?si=n6KaL03uEqm-GN1Z",
      "questionText": "What is your volume and deterrence in Perimeter defense?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are when it comes to how many shots you defend on the perimeter and how effective you are at stopping them? Take into account that perimeter deterrence doesn’t equal steals, but is more about how you affect scorers. Also, sometimes the best perimeter defenders are avoided and the worst defenders are targeted: though, this doesn’t always happen in pickup. (Use the visual to see what’s perimeter defense)",
      "exampleText": "For example, I am very active on the perimeter and helping out even though I’m overall only okay at perimeter defense. So, I am probably around 80% in volume but only 50% in deterrence.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/3-point-locations.jpg"
    },
    {
      "id": 11,
      "title": "Playmaking",
      "titleLink": "https://youtu.be/Y52sQoSAr6g?si=wOwOe_QBACTOhn4M",
      "questionText": "What is your assist and turnover percentile?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are in assisting your teammates and turning the ball over? Take into account that, generally speaking, the players who have the ball assist and turnover the most. There are exceptions of people who primarily score and lose the ball a lot trying too, players who playmaker and are very conservative and precise with their passing and dribbling, and people who do neither and score mostly off the ball.",
      "exampleText": "For example, I create some assists on the break, driving and kicking and through handoffs, but in general I do not dominate the ball and my passing isn’t anything next level. My handle is below average and sometimes my passes are off the mark. So, I’d say my playmaking is around 40% while my turnover is around 70%.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/assist-turnover-locations.jpg"
    },
    {
      "id": 12,
      "title": "Rebounding",
      "titleLink": "https://youtu.be/aPzNoIzrojc?si=OsgsKlYecWaMmjO-",
      "questionText": "What is your offensive and defensive rebounding percentile?",
      "explanationText": "Compared to the people you play pickup basketball against, what percentile do you think you are rebounding on the offensive and defensive glass? Take into account if you crash the boards or start the break, your size and hops, and especially who you typically play against.",
      "exampleText": "For example, I am short and typically try to leak out rather than crash the boards; however, when it’s a close game I generally try to sneak around to steal some offensive rebounds to get my team some second chance points. Also, since I’m generally a guy my height, a lot of times I can steal a rebound or two as long as I do some high effort boxing out. So, I’d say I am around 30% for defensive rebounds and 50% for offensive rebounds.",
      "imageSrc": "https://www.basketballforcoaches.com/wp-content/uploads/2017/01/rebound-locations.jpg"
    }
  ];

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

    // Navigate to the next question using the name of the next question's title as a route parameter
    if(isLastQuestion) navigate('/Results');
    else 
    {
      navigate(`/Form/${questions[currentQuestionIndex + 1].title}`);
      window.location.reload();
    }
  };

  const handleBackClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setFormData({
      answer1: '',
      answer2: '',
    });

    // Navigate to the previous question using the same method as above
    navigate(`/Form/${questions[currentQuestionIndex - 1].title}`);
    window.location.reload();
  };

  return (
    <div className="formContainer">
      <div className="formImage">
        <img src={currentQuestion.imageSrc} alt={`Question ${currentQuestion.id}`} />
      </div>

      <div className="text-boxes">

        <Link to={currentQuestion.titleLink} style={{textDecoration:'none'}} target="_blank">
          <div className="title-text">
              {currentQuestion.title}
          </div>
        </Link>

        <div class="typewriter-wrapper" >
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
  );
};

export default MainPage;