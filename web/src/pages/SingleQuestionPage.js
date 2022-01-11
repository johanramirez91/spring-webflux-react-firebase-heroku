import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert';
import { fetchQuestion, deleteAnswer, redirectToNew, redirectToUpdate } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link, useHistory } from 'react-router-dom'
import QuestionReview from '../components/QuestionReview';

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  redirect,
  userId,
  userEmail
}) => {

  const { id } = match.params
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, redirect, id])

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history])

  const onDelete = (id) => {
    swal({
      title: "Delete?",
      text: "¡Remember, when deleting, you will not be able to recover information!",
      icon: "warning",
      buttons: ["Cancel", "Confirm"]
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(deleteAnswer(id));
        swal("¡Answer deleted!", {
          icon: "success",
        });
      } else {
        swal("uff!, what a relief");
      }
    })
  }

  const onEdit = (question) => {
    question.answers ? (
      swal({
        title: "Take care",
        text: "A new question will be created because this question alredy has answers",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((edit) => {
        if (edit) {
          dispatch(redirectToNew());
        }
      })) :
      dispatch(redirectToUpdate(question.id))
  }

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return (
      <div>
        <Question question={question} onEdit={onEdit} userId={userId} />
        <QuestionReview question={question} userEmail={userEmail} />
      </div>
    )
  }

  const renderAnswers = () => {
    return (question.answers) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete} />
    )) : (<p>Empty answer!</p>);
  }


  return (
    <section>
      {renderQuestion()}
      {userId &&
        <Link to={"/answer/" + id} className="waves-effect orange darken-2 btn white-text right bi bi-reply-fill">  Reply
        </Link>}

      <h2>Answers</h2>
      <hr />
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect,
  userEmail: state.auth.email,
  userId: state.auth.uid,
  photoURL: state.auth.photoURL,
})

export default connect(mapStateToProps)(SingleQuestionPage)