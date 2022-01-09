import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../actions/questionActions';
import { Question } from '../components/Question';

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const [search, setSearch] = useState('');
    const [categorySearch, setcategorySearch] = useState('');

    let questionFilterCategory = questions.filter(question => question.category.toUpperCase().includes(categorySearch.toUpperCase()));
    let questionFilterSearch = questionFilterCategory.filter(question => question.question.toUpperCase().includes(search.toUpperCase()));

    const goTOVariable = questionFilterSearch[0]?.id;

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questionFilterSearch.map(question => <Question setcategorySearch={setcategorySearch} key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h2>Questions</h2>
            <form className="form-search">
                <input type="text" onChange={handleSearch} placeholder="Buscar..." />
                <Link to={`/question/${goTOVariable}`}>
                    <input style={{ display: 'none' }} type="submit" value="search" />
                </Link>
            </form>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
})

export default connect(mapStateToProps)(QuestionsPage)
