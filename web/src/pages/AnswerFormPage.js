import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchQuestion, postAnswer } from '../actions/questionActions';
import { connect } from 'react-redux';
import { Question } from '../components/Question';
import { InputText } from "../components/InputText";

const FormPage = ({ dispatch, loading, redirect, match, hasErrors, question, userId }) => {

    const [content, setContent] = useState('');
    const { id } = match.params
    const history = useHistory();

    const validateInput = ({ answer }) => {
        if (answer.length && answer.length <= 200) {
            return true;
        }
        return false;
    }

    const onSubmit = event => {
        event.preventDefault();
        const data = {
            userId,
            questionId: id,
            answer: content
        }
        validateInput(data) && dispatch(postAnswer(data));
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }

    return (
        <section>
            {renderQuestion()}
            <h3>New Answer</h3>
            <hr />
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="answer">Answer</label>
                    <InputText id="answer" setContent={setContent} />
                </div>
                <br />
                <button type="submit" className="waves-effect orange darken-2 btn white-text" disabled={loading} >
                    {loading ? "Saving ...." : "Save"}
                </button>
            </form>
        </section>
    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)