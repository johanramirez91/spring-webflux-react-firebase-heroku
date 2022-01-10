const URL_BASE = 'http://localhost:8085'; // Cambiar a hEROKU

export const LOADING = 'LOADING'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAILURE = 'LOADED_FAILURE'

export const loading = () => ({ type: LOADING })

export const success = payload => ({
    type: LOADED_SUCCESS,
    payload
});

export const failure = () => ({ type: LOADED_FAILURE })

export function fetchQuestions() {
    //función anonima
    return async dispatch => {
        //se envías el type loading al reducer
        dispatch(loading())
        try {
            const response = await fetch(
                `${URL_BASE}/getAll`
            )
            const data = await response.json()
            //actualiza el store
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

//Trae las preguntas de un usaurio logueado
export function fetchOwnerQuestions(userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getOwnerAll/${userId}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

//Traer un sola pregunta
export function fetchQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/get/${id}`)
            const data = await response.json()
            dispatch(success({ question: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/create`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text()
            dispatch(success({ redirect: `/question/${id}` }));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/delete/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({ redirect: `/list` }));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postAnswer(answer) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/add`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                }
            )
            dispatch(success({ redirect: `/question/${answer.questionId}` }));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteAnswer(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/deleteAnswer/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({ redirect: `/question/${id}` }));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postReview(score, id, user) {
    return async (dispatch) => {
        dispatch(loading());
        try {
            const response = await fetch(`${URL_BASE}/addreview`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user, score: score, questionId: id }),
            });
            const data = await response.json();
            dispatch(success({ redirect: `/question/${id}`, question: data }));
        } catch (error) {
            dispatch(failure());
        }
    };
}
export function findByCategory(category) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/findCategory/${category}`)
            const data = await response.json()
            dispatch(success({ question: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function updateQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/edit`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text()
            dispatch(success({ redirect: `/question/${id}` }))
        } catch (error) {
            console.log("ERROR", error.message);
            dispatch(failure())
        }
    }
}

export function redirectToNew() {
    return async dispatch => {
        dispatch(success({ redirect: `/new` }));
    }
}

export function redirectToUpdate(id) {
    return async dispatch => {
        dispatch(success({ redirect: `/updateQuestion/${id}` }));
    }
}
