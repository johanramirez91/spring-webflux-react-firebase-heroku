import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ children }) => (
  <section>
    <h1>Home</h1>
    <hr />
    <div>
      {children}
    </div>
    <p>Welcome to....</p>
    <div className='container-image'>
      <img src="LogoSofkaOverFlow.png" alt="home image" />
      <br />
      <p>The question and answer app.</p>
      <hr />
    </div>
    <Link to="/questions" className="waves-effect orange darken-2 btn white-text">
      Go Questions
    </Link>
  </section>
)
export default HomePage
