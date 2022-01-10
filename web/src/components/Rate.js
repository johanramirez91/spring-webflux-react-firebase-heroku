import React from 'react'

function Rate({ question }) {

    const average = Math.round(question.sumReviewScores / question.numOfReviews);

    switch (average) {
        case 1:
            return <div>{`\u{1f641}`}</div>;
        case 2:
            return <div>{`\u{1f610}`}</div>
        case 3:
            return <div>{`\u{1f600}`}</div>;
        default:
            return <div>Without rate</div>
    }
}

export default Rate;