import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert';
import { fetchOwnerQuestions, deleteQuestion } from '../actions/questionActions'
import { Question } from '../components/Question'

const OwnerQuestionsPage = ({ dispatch, loading, questions, hasErrors, redirect, userId, photoURL, name }) => {

    useEffect(() => {
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const onDelete = (id) => {
        swal({
            title: "¿Delete?",
            text: "¡Remember, when deleting, you will not be able to recover information!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((eliminar) => {
            if (eliminar) {
                swal("¡Eliminated!", {
                    icon: "success",
                });
                dispatch(deleteQuestion(id))
            } else {
                swal("uff!, good thing we asked");
            }
        });
    }

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt onDelete={onDelete} />)
    }

    return (
        <section>
            <h1>Questions</h1>
            <hr />
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
    userId: state.auth.uid,
    photoURL: state.auth.photoURL,
    name: state.auth.displayName
})

export default connect(mapStateToProps)(OwnerQuestionsPage)
