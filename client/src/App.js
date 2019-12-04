import React, {Component} from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { Course } from './components/Course/Course.component';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    courses:[],
    searchField:'',
    finalSearch:''
  };
}
componentDidMount(){
  fetch('https://nut-case.s3.amazonaws.com/coursessc.json').then((response) => response.json()).then((courses) =>{
  this.setState({courses:courses});
  }
)};

updateSearch = e => {
      this.setState({searchField:e.target.value});
  };

getSearch = e => {
      e.preventDefault();
      this.setState({finalSearch:this.state.searchField});
    };


  render(){
    const {courses,searchField,finalSearch}=this.state;
    // console.log(finalSearch);
    const filteredCourses=courses.filter((course) =>{
    //console.log(course['Child Subject']);
    return course['Child Subject'].toLowerCase().includes(finalSearch.toLowerCase());
    });
    //console.log(filteredCourses);

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Online Course Search</h1>
          <div className="search-filter">
          <form onSubmit={this.getSearch} className="search-form">
            <SearchBox updateSearch={this.updateSearch} placeholder="Search Courses"/>
          </form>
          </div>
        </header>
            <div className="courses">
          </div>
        </div>
        );
  }
}

export default App;
