import React from 'react';


export const Answer = ({ answer, onDelete, userId, dispatch }) => (
  <aside className="answer">
    <p>{answer.answer}</p>
    {answer.userId === userId && <button className='waves-effect red darken-2 btn-small' onClick={() => onDelete(answer.id)}>Eliminar</button>}
  </aside>
)
