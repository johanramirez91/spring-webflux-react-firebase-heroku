import React from 'react'

const Rate = ({ question }) => {

    const average = Math.round(question.sumReviewScores / question.numOfReviews);

    switch (average) {
        case 1:
            return <div><i className='bi bi-emoji-frown icon-rating'></i></div>
        case 2:
            return <div><i className='bi bi-emoji-neutral icon-rating'></i></div>
        case 3:
            return <div><i className='bi bi-emoji-heart-eyes icon-rating'></i></div>
        default:
            return <div></div>
    }
}

export default Rate;