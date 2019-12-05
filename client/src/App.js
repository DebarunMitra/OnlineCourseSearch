import React, {Component} from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { Courses } from './components/course/course.component';
import { ProviderFilterBox } from './components/provider-filter-box/provider-filter-box.component';
import Spinner from './components/Spinner';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    courses:[],
    searchField:'',
    finalSearch:'',
    providerSearch:'',
    provider:'',
    sessionDate:''
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
sortValueAsen=e=>{
      e.preventDefault();
      //  console.log('sort');
      this.setState({courses:this.state.courses.sort((a,b)=>a.Length-b.Length)});
      //console.log(this.state.courses);
}
sortValueDesen=e=>{
  e.preventDefault();
  this.setState({courses:this.state.courses.sort((a,b)=>b.Length-a.Length)});
}
updateProvider=e=>{
        this.setState({providerSearch:e.target.value});
}
getProvider=e=>{
    e.preventDefault();
    this.setState({provider:this.state.providerSearch});
}
  render(){
    const {courses,finalSearch,provider}=this.state;
    let regexProvider='';
    (provider==='')?regexProvider = new RegExp(/.*\S.*/, "gi"):regexProvider = new RegExp("\\b(?:"+provider+")\\b", "gi");
    const filteredCourses=courses.filter((course) =>
         course['Child Subject'].toLowerCase().includes(finalSearch.toLowerCase())
         && course.Length!=='' &&
         course.Length!==0 &&
         course['Child Subject']!=='' &&
         course['Next Session Date']!=='' &&
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
            <label>Course Length:</label>
              <form onSubmit={this.sortValueAsen} className="search-form">
                <button className="btn-sort" type="submit"><i className="fas fa-sort-numeric-down"></i></button>
              </form>
              <form onSubmit={this.sortValueDesen} className="search-form">
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
