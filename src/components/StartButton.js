import { useSelector, useDispatch } from 'react-redux'
import { changeLoading, setQuestions, setCanNotStart, setScore, setIndex, setTriedToStart, setAnsweredAllQuestions } from '../features/quiz/quizSlice';

export default function StartButton() {

  const questionCategory = useSelector(state => state.quiz.quiz.questionCategory);
  const questionDifficulty = useSelector(state => state.quiz.quiz.questionDifficulty);
  const questionType = useSelector(state => state.quiz.quiz.questionType);
  const questionAmount = useSelector(state => state.quiz.quiz.amountOfQuestions);
  const answerSelected = useSelector(state => state.quiz.answerSelected);
  const canNotStart = useSelector(state => state.quiz.canNotStart);
  const questions = useSelector(state => state.quiz.questions);
  const questionIndex = useSelector(state => state.quiz.index);
  const question = questions[questionIndex];


  
  const dispatch = useDispatch();

  const handleLoadingChange = value => {
    dispatch(changeLoading(value));
  }

  const handleQuery = async () => {
    dispatch(
      setScore(0)
    );
    dispatch(
      setQuestions([])
    );
    dispatch(
      setIndex(0)
    );
    dispatch(
      setTriedToStart(true)
    );
    dispatch(
      setAnsweredAllQuestions(false)
    )
    
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;

    if (questionCategory) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`)
    }
    if (questionDifficulty) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
    }
    if (questionType) {
      apiUrl = apiUrl.concat(`&type=${questionType}`)
    }

    handleLoadingChange(true);

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        dispatch(
          setQuestions(response.results)
        )
        handleLoadingChange(false);
      });
  }

  const notClickable = () => {
    dispatch(
      setCanNotStart(true)
    );
    setTimeout(() => {
      dispatch(
        setCanNotStart(false)
      );
    }, 400)
  }
  
  return (
    <button className={`primary-button main-color my-3 py-1 ${canNotStart ? "shakeX-animation" : ""}`} onClick={!answerSelected ? handleQuery : notClickable}>{question ? "Start Again" : "Start"}</button>
  );
}