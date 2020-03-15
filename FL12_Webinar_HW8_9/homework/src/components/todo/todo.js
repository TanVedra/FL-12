import React from 'react';
import './todo.css';
import ToDoButton from '../todo-button/todo-button';


export default ({ courses, deleteFunc }) => courses.map(course => {
    return (
        <div className='todo-wrapper' key={course.id}>
            <span className='todo-date'>
                {course.date}
            </span>
            <span className='todo-name'>
                <strong>
                    {course.name}
                </strong>
            </span>
            <span className='todo-description'>
                {course.description}
            </span>
            <span className='todo-duration'>
                {course.duration}
            </span>
            <ToDoButton
                course={course}
                deleteFunc={deleteFunc}
            />
        </div>
    )
})