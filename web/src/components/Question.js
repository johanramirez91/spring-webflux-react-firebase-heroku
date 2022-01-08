import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <p>{question.category}  - <small>{question.type}</small></p>

    {onDelete && (
      <button className='waves-effect red darken-2 btn-small' onClick={() => onDelete(question.id)}>Delete</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
)
