import React from 'react'

export const Footer = () => {
    return (
        <footer className='page-footer indigo darken-4'>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Sofka OverFlow</h5>
                        <hr />
                        <blockquote className='amber darken-4'>Here you can ask, answer and rate questions</blockquote>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text m-3">Follow us...</h5>
                        <ul>
                            <li>
                                <a className="grey-text text-lighten-3 bi bi-github m-3" style={{ "fontSize": "30px" }} href="https://github.com/johanramirez91/spring-webflux-react-firebase-heroku" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-linkedin" style={{ "fontSize": "30px" }} href="https://www.linkedin.com/company/sofka-technologies/" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-youtube m-3" style={{ "fontSize": "30px" }} href="https://www.youtube.com/watch?v=sAMMpZDKygE&t=2s" target="_blank"></a>
                                <a className="grey-text text-lighten-3 bi bi-instagram" style={{ "fontSize": "30px" }} href="https://www.instagram.com/sofka_technologies/?hl=es" target="_blank"></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        © 2021 by: Johan Ramirez
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
            </div>
        </footer>
    )
}
