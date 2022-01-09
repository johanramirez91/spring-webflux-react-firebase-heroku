import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete, setcategorySearch }) => {

  const handleCategorySearch = () => {
    setcategorySearch(question.category)
  }

  return (
    <article className={excerpt ? 'question-excerpt' : 'question'}>
      <div>
        <img className='profile-img' src={question.userPhotoURL ? question.userPhotoURL : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"} alt='img'></img>
      </div>
      <h2><div dangerouslySetInnerHTML={{ __html: question.question }} /></h2>

      {setcategorySearch ?
        <p className="indigo-text" onClick={handleCategorySearch}>{question.category} - <small>{question.type}</small></p> :
        <p>{question.category}  - <small>{question.type}</small></p>}
      {onDelete && (
        <button className='waves-effect red darken-2 btn right bi bi-trash-fill white-text' onClick={() => onDelete(question.id)}>Delete</button>
      )}
      {excerpt && (
        <Link to={`/question/${question.id}`} className="waves-effect orange darken-2 btn white-text bi bi-eye">  View Question
        </Link>
      )}

    </article>
  )

}
