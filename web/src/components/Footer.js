import React from 'react'

export const Footer = () => {
    return (
        <footer className='page-footer blue darken-4'>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h4 className="white-text"><u>Sofka OverFlow</u></h4>
                        <i className="grey-text text-lighten-4">"El que conoce todas las respuestas, no ha hecho todas las preguntas."</i>
                        <br />
                        <p>En esta app puedes hacer y responder preguntas, o encontrar respuestas a preguntas que no te habías hecho</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text m-3">Visitanos...</h5>
                        <ul>
                            <li>
                                <a className="grey-text text-lighten-3 bi bi-github m-3" style={{ "font-size": "35px" }} href="https://github.com/johanramirez91/spring-webflux-react-firebase-heroku" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-linkedin" style={{ "font-size": "35px" }} href="https://www.linkedin.com/company/sofka-technologies/" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-youtube m-3" style={{ "font-size": "35px" }} href="https://www.youtube.com/watch?v=sAMMpZDKygE&t=2s" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-instagram" style={{ "font-size": "35px" }} href="https://www.instagram.com/sofka_technologies/?hl=es" target="_blank"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container text-center">
                    © 2021 by: Johan Ramirez
                </div>
            </div>
        </footer>
    )
}
