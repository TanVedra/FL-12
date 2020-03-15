import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './EditCoursePage.css';
import Button from '../components/button/button';

class EditCoursePage extends Component {
    constructor(props) {
        super(props);
        this.currentWay = window.location.href;
        this.state = { ...this.getCurrentCourse(this.currentWay) };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    getCurrentCourse(str) {
        const id = Number(str.substring(27));
        const course = this.props.courses.find(course => course.id === id);
        return course;
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
            this.props.updateCourse(this.state);
            return '/';
        } else {
            return '/add-course';
        }
    }

    render() {
        return (
            <div className='new-page'>
                <div className='form-wrapper'>
                    <h2>Edit Course</h2>
                    <p>Title*</p>
                    <input type='text' className='title' name='name' value={this.state.name} onChange={this.handleChange} />
                    <p>Description*</p>
                    <textarea className='description' name='description' value={this.state.description} onChange={this.handleChange}>
                    </textarea>
                    <p>Duration*</p>
                    <input type='text' className='durations' name='duration' value={this.state.duration} onChange={this.handleChange} />
                    <p>Authors*</p>
                    <input type='text' className='authors' name='authors' value={this.state.authors} onChange={this.handleChange} />
                    <p>Date*</p>
                    <input type='date' className='date' name='date' value={this.state.date} onChange={this.handleChange} />
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

export default EditCoursePage;