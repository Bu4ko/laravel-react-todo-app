import RequireAuth from "./components/auth/RequireAuth";

require('./bootstrap')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Auth.
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import store from './app/store'
import { Provider } from 'react-redux'
import RequireAnonimous from "./components/auth/RequireAnonimous";
import FrontPage from "./components/FrontPage";
import TodoLists from "./components/todo/TodoLists";
import TodoItems from "./components/todo/TodoItems";
import Header from "./components/navbar/Header";

function App() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route element={ <RequireAnonimous /> }>
                            <Route exact path="/" element={ <FrontPage/> } />
                            <Route exact path="/login" element={ <Login/> } />
                            <Route exact path="/register" element={ <Register/> } />
                        </Route>
                        <Route element={ <RequireAuth /> }>
                            <Route exact path="/lists" element={ <TodoLists/> } />
                            <Route exact path="/lists/:listId" element={ <TodoItems/> } />
                        </Route>
                    </Routes>
                </Router>
            </Provider>
        </div>
    );
}

export default App

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
