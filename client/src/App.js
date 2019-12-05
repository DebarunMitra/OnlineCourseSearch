import React, {Component} from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { Courses } from './components/course/course.component';
import { ProviderFilterBox } from './components/provider-filter-box/provider-filter-box.component';
import Spinner from './components/Spinner';
import SessionFilter from './service/SessionFilter';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    courses:[],
    searchField:'',
    finalSearch:'',
    providerSearch:'',
    provider:'',
    session:''
  };
}
componentDidMount(){
  fetch('https://nut-case.s3.amazonaws.com/coursessc.json').then((response) => response.json()).then((courses) =>{
  this.setState({courses:courses});
  }
)};

updateSearch = e => {
  this.setState({
    searchField: e.target.value
  });
};

getSearch = e => {
  e.preventDefault();
  this.setState({
    finalSearch: this.state.searchField
  });
};
sortSessionAsceYear=e=>{
  e.preventDefault();
  let courseData=new SessionFilter(this.state.courses);
  let sortBySession=courseData.getSessionDate();
  this.setState({
    courses:sortBySession.sort((a,b)=>a['SessionDate']-b['SessionDate'])
  });
}
sortSessionDescYear=e=>{
  e.preventDefault();
  let courseData=new SessionFilter(this.state.courses);
  let sortBySession=courseData.getSessionDate();
  this.setState({
    courses:sortBySession.sort((a,b)=>b['SessionDate']-a['SessionDate'])
  });
}
sortValueAsce = e => {
  e.preventDefault();
  this.setState({
    courses: this.state.courses.sort((current, next) => current.Length - next.Length)
  });
}
sortValueDesc = e => {
  e.preventDefault();
  this.setState({
    courses: this.state.courses.sort((current, next) => next.Length - current.Length)
  });
}
updateProvider = e => {
  this.setState({
    providerSearch: e.target.value
  });
}
getProvider = e => {
  e.preventDefault();
  this.setState({
    provider: this.state.providerSearch
  });
}
  render(){
    const {courses,finalSearch,provider,session}=this.state;
    let regexProvider='',regexSession='';
    (provider==='')?regexProvider = new RegExp(/.*\S.*/, "gi"):regexProvider = new RegExp("\\b(?:"+provider+")\\b", "gi");
    (session==='')?regexSession = new RegExp(/.*\S.*/, "gi"):regexSession = new RegExp("\\b(?:"+session+")\\b", "gi");
    const filteredCourses=courses.filter((course) =>
         course['Child Subject'].toLowerCase().includes(finalSearch.toLowerCase())
         && course.Length!=='' &&
         course.Length!==0 &&
         course['Child Subject']!=='' &&
         course['Next Session Date']!=='' &&
         course['Next Session Date']!=='Self paced' &&
         course.Provider.match(regexProvider) &&
         course['Universities/Institutions'].match(/.*\S.*/)
    );

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Online Course Search</h1>
          <div className="search-filter">
          <form onSubmit={this.getSearch} className="search-form">
            <SearchBox updateSearch={this.updateSearch} placeholder="Search Courses"/>
          </form>
          </div>
          {(filteredCourses.length)?(<h6 className="total-course">Course Found: {filteredCourses.length}</h6>):<Spinner />}
          {(filteredCourses.length)?(
            <div className="filter-sort-course">
            <label>Session Date:</label>
              <form onSubmit={this.sortSessionAsceYear} className="search-form">
                <button className="btn-sort" type="submit"><i className="fas fa-sort-numeric-down"></i></button>
              </form>
              <form onSubmit={this.sortSessionDescYear} className="search-form">
                <button className="btn-sort" type="submit"><i className="fas fa-sort-numeric-up"></i></button>
              </form>
            <label>Course Length:</label>
              <form onSubmit={this.sortValueAsce} className="search-form">
                <button className="btn-sort" type="submit"><i className="fas fa-sort-numeric-down"></i></button>
              </form>
              <form onSubmit={this.sortValueDesc} className="search-form">
                <button className="btn-sort" type="submit"><i className="fas fa-sort-numeric-up"></i></button>
              </form>
              <form onSubmit={this.getProvider} className="search-form">
                <ProviderFilterBox updateProvider={this.updateProvider} placeholder="Search Provider"/>
              </form>
            </div>
          ):false}
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
