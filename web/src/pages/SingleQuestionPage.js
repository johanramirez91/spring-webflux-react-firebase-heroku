import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert';
import { fetchQuestion, deleteAnswer } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  redirect,
  userId,
  photoURL,
  name
}) => {

  const { id } = match.params

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, redirect, id])

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

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete} />
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="waves-effect orange darken-2 btn white-text right bi bi-reply-fill">  Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect,
  userId: state.auth.uid,
  photoURL: state.auth.photoURL,
  name: state.auth.displayName
})

export default connect(mapStateToProps)(SingleQuestionPage)
