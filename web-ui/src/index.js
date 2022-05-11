import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Spinner} from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

const App = lazy(() => import('./views/App'));
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));
const NotFound = lazy(() => import('./views/NotFound'));
const Home = lazy(() => import('./views/Home'));
const Answer = lazy(() => import('./views/Answer'));
const Person = lazy(() => import('./views/Person'));
const PostArticle = lazy(() => import('./views/PostArticle'));
const PostQuestion = lazy(() => import('./views/PostQuestion'));
const Article = lazy(() => import('./views/Article'));
const Question = lazy(() => import('./views/Question'));
const Search = lazy(() => import('./views/Search'));
/**
 * 利用子路由实现页面组合
 */
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/answer" element={<Answer />} />
            <Route path="/person" element={<Person />}/>
            <Route path="/postarticle" element={<PostArticle />}/>
            <Route path="/postquestion" element={<PostQuestion />}/>
            <Route path="/article/:id" element={<Article />}/>
            <Route path="/question/:id" element={<Question />}/>
            <Route path="/search" element={<Search />}/>
        </Route>
        <Route path="/login" element={
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <Login />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <Register />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <NotFound />
          </Suspense>
        } />
    </Routes>
  </BrowserRouter>
);

