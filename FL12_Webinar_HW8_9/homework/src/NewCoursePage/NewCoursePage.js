import React, { Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import './NewCoursePage.css';
import Button from '../components/button/button';


class NewCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.generateId(),
            name: '',
            description: '',
            duration: '',
            authors: '',
            date: ''
        }
    }

    setInputToState = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState({ [key]: value });
    }

    checkCourse(data) {
        const course = { ...data };
        const values = Object.values(course);
        let counter = 0;

        for (let value of values) {
            if (value === '') {
                counter++;
            }
        }
        if (!counter) {
            this.props.addCourse(course);
            return '/';
        } else {
            return '/add-course';
        }
    }

    render() {
        return (
            <div className='new-page'>
                <div className='form-wrapper'>
                    <h2>New Course</h2>
                    <p>Title*</p>
                    <input type='text' className='title' name='name' onInput={this.setInputToState.bind(this)} />
                    <p>Description*</p>
                    <textarea className='description' name='description' onInput={this.setInputToState.bind(this)}>
                    </textarea>
                    <p>Duration*</p>
                    <input type='text' className='durations' name='duration' onInput={this.setInputToState.bind(this)} />
                    <p>Authors*</p>
                    <input type='text' className='authors' name='authors' onInput={this.setInputToState.bind(this)} />
                    <p>Date*</p>
                    <input type='date' className='date' name='date' onInput={this.setInputToState.bind(this)} />
                    <div>
                        <Route
                            render={({ history }) => (
                                <Button title='Save'
                                    func={() => {
                                        history.push(this.checkCourse(this.state));
                                    }
                                    }
                                />
                            )}
                        />

                        <Link to='/'>
                            <span className='cancel'>
                                Cancel
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(NewCoursePage);