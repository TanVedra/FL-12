import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './todo-button.css';
import deleteIcon from './delete.svg';
import editIcon from './edit.svg';

class ToDoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    toggle = () => {
        this.setState({ isActive: !this.state.isActive });
    }

    render() {
        return (
            <div className='todo-button-wrapper'>
                <span className='todo-button' onClick={this.toggle}>...</span>
                {
                    this.state.isActive
                        ? (
                            <div className='todo-button-content'>
                                <Link to={`/edit/${this.props.course.id}`}>
                                    <div>
                                        <img src={editIcon} alt='edit icon' />
                                        <span style={{ color: '#000' }}>
                                            Edit
                                    </span>
                                    </div>
                                </Link>
                                <div onClick={() => this.props.deleteFunc(this.props.course.id)}>
                                    <img src={deleteIcon} alt='delete icon' />
                                    <span>
                                        Delete
                                    </span>
                                </div>
                            </div>
                        )
                        :
                        null
                }
            </div >
        )
    }
}

export default ToDoButton;