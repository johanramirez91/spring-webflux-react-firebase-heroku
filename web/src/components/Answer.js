import React from 'react';


export const Answer = ({ answer, onDelete, userId, dispatch }) => (
  <aside className="answer">
    <p><div dangerouslySetInnerHTML={{ __html: answer.answer }} /></p>
    {answer.userId === userId && <button className='waves-effect red darken-2 white-text btn-small bi bi-trash-fill' onClick={() => onDelete(answer.id)}>Eliminar</button>}
  </aside>
)
