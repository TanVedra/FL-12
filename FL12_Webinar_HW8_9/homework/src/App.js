import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import EditCoursePage from './EditCoursePage/EditCoursePage';
import NewCoursePage from './NewCoursePage/NewCoursePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [
        {
          id: 1,
          name: "Prerequisites",
          description: "Webpack, Angular CLI, TypeScript",
          duration: "01h 34min",
          authors: "Jane Doe",
          date: "2018-02-18"
        },
        {
          id: 2,
          name: "Components",
          description: "Components lifecycle",
          duration: "01h 15min",
          authors: "Sam Doe",
          date: "2018-02-01"
        },
        {
          id: 3,
          name: "Directives + Pipes",
          description: "Directives, types of directives, built-in directives, pipes",
          duration: "01h 34min",
          authors: "Mary Doe",
          date: "2018-01-15"
        }
      ]
    };
  }

  addCourse(course) {
    this.setState(state => {
      return state.courses.push(course);
    });
  }

  deleteCourse(id) {
    const courses = [...this.state.courses];
    courses.splice(courses.findIndex(course => course.id === id), 1);
    this.setState({ courses });
  }

  generateId() {
    const courses = [...this.state.courses];
    return courses.length ? Math.max(...courses.map(course => course.id)) + 1 : 1;
  }

  updateCourse(courseUpdate) {
    let courses = [...this.state.courses];
    const index = courses.findIndex(course => course.id === courseUpdate.id);
    delete courses[index];
    courses[index] = courseUpdate;
    this.setState(state => state = { courses });
  }

  render() {
    return (
      <div>

        <Route path='/' exact>
          <MainPage
            deleteFunc={this.deleteCourse.bind(this)}
            courses={this.state.courses}
          />
        </Route>
        <Route path='/add-course'>
          <NewCoursePage
            addCourse={this.addCourse.bind(this)}
            generateId={this.generateId.bind(this)}
          />
        </Route>
        <Route path='/edit/:id'>
          <EditCoursePage
            courses={this.state.courses}
            updateCourse={this.updateCourse.bind(this)}
          />
        </Route>
      </div>
    );
  }
}

export default App;