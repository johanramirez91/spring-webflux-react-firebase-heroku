import React from 'react'

export const Footer = () => {
    return (
        <footer className='bg-light text-center text-lg-start fixed-bottom mt-3 indigo darken-4'>
            <div className="row">
                <div className="col l4 offset-l2 s12">
                    <h5 className="white-text">Sofka OverFlow</h5>
                    <blockquote className='amber darken-4'>Here you can ask, answer and rate questions</blockquote>
                    <h6 className='white-text'>
                        © 2021 by: Johan Ramirez
                    </h6>
                </div>
                <div className="col l4 offset-l2 s12">
                    <h6 className="white-text m-3">Follow us...</h6>
                    <ul>
                        <li>
                            <a dangerouslySetInnerHTML={{ __html: '' }} className="white-text text-lighten-3 bi bi-github m-3" style={{ "fontSize": "25px" }}
                                href="https://github.com/johanramirez91/spring-webflux-react-firebase-heroku"
                                target="_bwhite" rel="noopener noreferrer"></a>
                            <a dangerouslySetInnerHTML={{ __html: '' }} className="white-text text-lighten-3 bi bi-linkedin" style={{ "fontSize": "25px" }}
                                href="https://www.linkedin.com/company/sofka-technologies/"
                                target="_bwhite" rel="noopener noreferrer"></a>
                            <a dangerouslySetInnerHTML={{ __html: '' }} className="white-text text-lighten-3 bi bi-youtube m-3" style={{ "fontSize": "25px" }}
                                href="https://www.youtube.com/watch?v=sAMMpZDKygE&t=2s"
                                target="_bwhite" rel="noopener noreferrer"></a>
                            <a dangerouslySetInnerHTML={{ __html: '' }} className="white-text text-lighten-3 bi bi-instagram" style={{ "fontSize": "25px" }}
                                href="https://www.instagram.com/sofka_technologies/?hl=es"
                                target="_blank" rel="noopener noreferrer"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
