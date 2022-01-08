import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login, logout } from './actions/authActions';

import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import Login from './pages/Login';
import Register from './pages/Register';
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";
import { Footer } from './components/Footer';


const auth = firebase.auth();

const App = ({ dispatch }) => {

  const [user] = useAuthState(auth);
  if (user) {
    dispatch(login(user.email, user.uid))
  }

  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage />
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/login" component={() => {
              return (
                <Login dispatch={dispatch}>
                </Login>
              );
            }} />
            <Route exact path="/register" component={() => {
              return (
                <Register dispatch={dispatch}>
                </Register>
              );
            }} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </>
      }
    </Router>
  )
}


function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="btn waves-effect waves-light red darken-2 right bi bi-box-arrow-right white-text"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
        }}
      >  Sign out
      </button>
    )
  );
}

export default App
