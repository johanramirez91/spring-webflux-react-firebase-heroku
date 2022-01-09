import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ children }) => (
  <section>
    <h1>Home</h1>
    <hr />
    <div>
      {children}
    </div>
    <p className='indigo-text'>Welcome to....</p>
    <div className='container-img'>
      <img src="LogoSofkaOverFlow.png" alt="logo" />
      <br />
      <p className='indigo-text'>The question and answer app.</p>
      <hr />
    </div>
    <Link to="/questions" className="waves-effect orange darken-2 btn white-text">
      Go Questions
    </Link>
  </section>
)
export default HomePage
