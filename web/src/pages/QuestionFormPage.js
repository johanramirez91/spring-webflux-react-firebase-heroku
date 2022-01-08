import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions';
import { connect } from 'react-redux';
import { InputText } from "../components/InputText";

const FormPage = ({ dispatch, loading, redirect, userId, useEmail }) => {

    const [formState, setFormState] = useState({
        type: 'OPEN (LONG OPEN BOX)',
        category: 'TECHNOLOGY AND COMPUTER'
    });

    const [content, setContent] = useState('');
    const history = useHistory();

    const onSubmit = event => {
        event.preventDefault();
        const data = {
            ...formState,
            userId,
            question: content,
            useEmail
        }
        validateInput(data) && dispatch(postQuestion(data));
    }

    const validateInput = ({ question }) => {
        if (question.length && question.length <= 200) {
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
            <h1>New Question</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="type">Type</label>
                    <select name="type" onChange={handleInputChange} id="type">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select name="category" onChange={handleInputChange} id="category">
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
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>
    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    userEmail: state.auth.email
})

export default connect(mapStateToProps)(FormPage)