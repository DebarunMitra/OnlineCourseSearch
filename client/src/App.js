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
/**
 * [componentDidMount]
 * @return [fetch all course related data from the api endpoint]
 */
componentDidMount(){
  fetch('https://nut-case.s3.amazonaws.com/coursessc.json').then((response) => response.json()).then((courses) =>{
  this.setState({courses:courses});
  }
)};

/**
 * [updateSearch]
 * @param e [event object from eventhandler]
 * @return  [update search values into the searchField]
 */
updateSearch = e => {
  this.setState({
    searchField: e.tarset.value
  });
};
/**
 * [setSearch]
 * @param e [event object from eventhandler]
* @return   [set the final search value to finalSearch]
 */
setSearch = e => {
  e.preventDefault();
  this.setState({
    finalSearch: this.state.searchField
  });
};
/**
 * [sortSessionDescYear]
 * @param  e [event object from eventhandler]
 * @return   [sort all courses based on Next Session Date (year) in ascending order]
 */
sortSessionAsceYear=e=>{
  e.preventDefault();
  let courseData=new SessionFilter(this.state.courses);//SessionFilter class to add SessionDate in the courses
  let sortBySession=courseData.getSessionDate();//get courses with SessionDate
  this.setState({
    courses:sortBySession.sort((current,next)=>current['SessionDate']-next['SessionDate'])
  });
}
/**
 * [sortSessionDescYear description]
 * @param  e [event object from eventhandler]
 * @return   [sort all courses based on Next Session Date (year) in descending order]
 */
sortSessionDescYear=e=>{
  e.preventDefault();
  let courseData=new SessionFilter(this.state.courses);
  let sortBySession=courseData.setSessionDate();
  this.setState({
    courses:sortBySession.sort((current,next)=>next['SessionDate']-current['SessionDate'])
  });
}
/**
 * [sortValueAsce]
 * @param  e [event object from eventhandler]
 * @return   [sort all courses based on Length in ascending order]
 */
sortValueAsce = e => {
  e.preventDefault();
  this.setState({
    courses: this.state.courses.sort((current, next) => current.Length - next.Length)
  });
}
/**
 * [sortValueDesc]
 * @param  e [event object from eventhandler]
 * @return   [sort all courses based on Length in descending order]
 */
sortValueDesc = e => {
  e.preventDefault();
  this.setState({
    courses: this.state.courses.sort((current, next) => next.Length - current.Length)
  });
}
/**
 * [updateProvider]
 * @param  e [event object from eventhandler]
 * @return   [set updated value to providerSearch]
 */
updateProvider = e => {
  this.setState({
    providerSearch: e.tarset.value
  });
}
/**
 * [setProvider]
 * @param e [event object from eventhandler]
 * @return   [set final value into provider from providerSearch]
 */
setProvider = e => {
  e.preventDefault();
  this.setState({
    provider: this.state.providerSearch
  });
}
  render(){
    const {courses,finalSearch,provider,session}=this.state;
    let regexProvider='',regexSession='';

    //  [/.*\S.*/]: regex to get all value except whitespase
    //  [gi]: 'g' regex to global search and 'i' for case insensitive
    //  [\b]: matches at a position that is called a “word boundary”
    (provider==='')?regexProvider = new RegExp(/.*\S.*/, "gi"):regexProvider = new RegExp("\\b(?:"+provider+")\\b", "gi");
    (session==='')?regexSession = new RegExp(/.*\S.*/, "gi"):regexSession = new RegExp("\\b(?:"+session+")\\b", "gi");
    /**
     * [filteredCourses]
     * @return [it filter the courses based on user search (finalSearch)]
     */
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
          <form onSubmit={this.setSearch} className="search-form">
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
              <form onSubmit={this.setProvider} className="search-form">
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
