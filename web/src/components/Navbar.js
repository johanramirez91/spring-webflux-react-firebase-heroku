import React from 'react'
import { Link } from 'react-router-dom'

export const PublicNavbar = () => (
  <nav>
    <section>
      <div className="nav-wrapper">
        <a href="#!"><img src="https://i.ibb.co/sKF2xBP/Logo-Sofka-Over-Flow.png" alt="logo" width="110px" /></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/" className='grey-text text-lighten-3 bi-house-door-fill'></Link></li>
          <li><Link to="/questions">Questions</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <section>
      <div className="nav-wrapper">
        <a href="#!"><img src="https://i.ibb.co/sKF2xBP/Logo-Sofka-Over-Flow.png" alt="logo" width="110px" /></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/" className='white-text text-lighten-3 bi-house-door-fill'></Link></li>
          <li><Link to="/questions">Questions</Link></li>
          <li><Link to="/new">New</Link></li>
          <li><Link to="/list">My Questions</Link></li>
        </ul>
      </div>
    </section>
  </nav>
)
