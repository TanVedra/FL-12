import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import Button from '../components/button/button';
import Search from '../components/search/search';
import ToDo from '../components/todo/todo';

export default (props) => (
    <div className='main-page'>
        <div>
            <Search />
            <Link to='/add-course'>
                <Button title='Add course' />
            </Link>
        </div>
        <div>
            <ToDo
                courses={props.courses}
                deleteFunc={props.deleteFunc}
            />
        </div>
    </div>
)