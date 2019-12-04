import React, {Component} from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { Courses } from './components/course/course.component';
import Spinner from './components/Spinner';

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
sortcoursebylength=e=>{
        e.preventDefault();
  console.log('sort');
}

  render(){
    const {courses,searchField,finalSearch}=this.state;
    // console.log(finalSearch);
    const filteredCourses=courses.filter((course) =>
        course['Child Subject'].toLowerCase().includes(finalSearch.toLowerCase())
         && course.Length!=='' &&
         course.Length!==0 &&
         course['Child Subject']!=='' &&
         course['Next Session Date']!=='' &&
         course.Provider!==''
    );
  //  filteredCourses.sort((a,b)=>a.Length-b.Length)
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Online Course Search</h1>
          <div className="search-filter">
          <form onSubmit={this.getSearch} className="search-form">
            <SearchBox updateSearch={this.updateSearch} placeholder="Search Courses"/>
          </form>
          <input type="button" sortcoursebylength={this.sortcoursebylength} value="Sort" />
          </div>
          {(filteredCourses.length)?(<h6 className="total-course">Course Found: {filteredCourses.length}</h6>):<Spinner />}
        </header>
            <div className="courses">
          {filteredCourses.map((course,index)=>(
            <Courses
                key={index}
                courseId={course['Course Id']}
                courseName={course['Course Name']}
                provider={course.Provider}
                uniOrIns={course['Universities/Institutions']}
                nextSession={course['Next Session Date']}
                childSubject={course['Child Subject']}
                length={course.Length}
                video={course['Video(Url)']}
                url={course.Url}
             />
          ))}
          </div>
        </div>
        );
  }
}

export default App;
