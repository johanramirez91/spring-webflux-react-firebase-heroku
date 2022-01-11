import React from 'react';

export const Answer = ({ answer, onDelete, userId }) => (

  <aside className="answer">
    <div className='float-start'>
      <img className='photo-response' src={answer.userPhotoURL ? answer.userPhotoURL : "https://i.ibb.co/1rkvVY3/foto-anonimus-profile.png"} alt="img" />
    </div>
    <h5><div dangerouslySetInnerHTML={{ __html: answer.answer }} /></h5>
    {answer.questionId === userId && <button className='waves-effect red darken-2 btn-small' onClick={() => onDelete(answer.id)}>Eliminar</button>}
  </aside>

)