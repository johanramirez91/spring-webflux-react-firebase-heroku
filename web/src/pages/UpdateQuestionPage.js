import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { fetchQuestion, updateQuestion } from '../actions/questionActions';
import { InputText } from '../components/InputText';



const UpdateQuestionPage = ({ dispatch, loading, match, redirect, userId, useEmail, photoURL, question }) => {

    const [formState, setFormState] = useState({
        type: 'OPEN (LONG OPEN BOX)',
        category: 'TECHNOLOGY AND COMPUTER'
    });

    const [content, setContent] = useState(question);
    const history = useHistory();
    const { id } = match.params

    useEffect(() => {
        dispatch(fetchQuestion(id));
    }, [dispatch, id, redirect])

    const onSubmit = event => {
        event.preventDefault();
        const data = {
            ...formState,
            userId,
            question: content,
            useEmail,
            userPhotoURL: photoURL,
        }
        validateInput(data) && dispatch(updateQuestion(data));
    }

    const validateInput = ({ question }) => {
        if (question.length && question.length <= 300) {
            swal({
                title: "Good!",
                text: "We hope you solve your doubt",
                icon: "success",
                button: "Go!",
            });
            return true;
        }
        return false;
    }

    const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        });
    }

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])


    return (
        <section>
            <h2>Edit your question:</h2>
            <h5>{question.question}</h5>
            <hr />
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="type">Type</label>
                    <select className="browser-default" name="type" defaultChecked={content.type}
                        onChange={handleInputChange} id="type">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select className="browser-default" name="category" defaultChecked={content.category}
                        onChange={handleInputChange} id="category">
                        <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="question">Question</label>
                    <InputText id="question" setContent={setContent} />
                </div>
                <br />
                <button type="submit" className="waves-effect orange darken-2 btn white-text" disabled={loading} >
                    {loading ? "Saving ..." : "Save"}
                </button>
            </form>
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
})

export default connect(mapStateToProps)(UpdateQuestionPage)