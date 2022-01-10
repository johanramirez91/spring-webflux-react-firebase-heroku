import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../actions/questionActions';
import Rate from '../components/Rate';


function QuestionReview({ question, dispatch, loading, hasErrors, userEmail }) {

    const [state, setState] = useState("");

    const happy = () => {
        setState("3")
    }

    const serious = () => {
        setState("2")
    }

    const sad = () => {
        setState("1")
    }

    const onSubmit = () => {
        if (state !== "") {
            dispatch(postReview(state, question.id, userEmail));
        }
    };

    const renderQuestions = () => {
        return question.userReviews?.includes(userEmail);
    };

    if (loading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Unable to display questions.</p>;


    return (
        <section className='section-review'>
            {renderQuestions() || userEmail === null ? (
                <div>
                    Average rating: <Rate question={question} />
                    <br />
                </div>
            ) : (
                <form onSubmit={onSubmit} className='mb-2'>
                    <div>
                        <label htmlFor="review">Question rating</label>
                        <div>
                            <button className='waves-effect indigo darken-2 btn m-1' onClick={sad} type='submit'>{`\u{1f641}`}</button>
                            <button className='waves-effect indigo darken-2 btn m-1' onClick={serious} type='submit'>{`\u{1f610}`}</button>
                            <button className='waves-effect indigo darken-2 btn m-1' onClick={happy} type='submit'>{`\u{1f600}`}</button>
                        </div>
                    </div>
                </form>
            )}
        </section>
    )
}

const mapStateToProps = (state) => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    userEmail: state.auth.email,
    photoURL: state.auth.photoURL,
    name: state.auth.displayName
})

export default connect(mapStateToProps)(QuestionReview)