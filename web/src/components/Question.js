import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete, setcategorySearch }) => {

  const handleCategorySearch = (e) => {
    setcategorySearch(question.category)
  }

  return (
    <article className={excerpt ? 'question-excerpt' : 'question'}>

      <h3><div dangerouslySetInnerHTML={{ __html: question.question }} /></h3>

      {setcategorySearch ?
        <p className="categorySearch" onClick={handleCategorySearch}>{question.category}  - <small>{question.type}</small></p> :
        <p>{question.category}  - <small>{question.type}</small></p>}

      {excerpt && (
        <Link to={`/question/${question.id}`} className="waves-effect orange darken-2 btn white-text bi bi-eye">  View Question
        </Link>
      )}

      {onDelete && (
        <button className='waves-effect red darken-2 btn right bi bi-trash-fill white-text' onClick={() => onDelete(question.id)}>Delete</button>
      )}
    </article>
  )

}
