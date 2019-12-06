import React from 'react' ;
import './course.style.css';

export const Courses = ({ courseId,
                        courseName,
                        provider,
                        uniOrIns,
                        nextSession,
                        childSubject,
                        length,
                        video,
                        url
                       }) => (
  <div className="course">
    <h1 className="course_title">{courseName}</h1>
    <h4>Institutions: {uniOrIns}</h4>
    <h4>Provider: {provider}</h4>
    <ul className="course-details">
      <li className="schedule"><i className="fas fa-caret-right" />Subject: {childSubject}</li>
      <li className="schedule"><i className="fas fa-caret-right" />Next Session: {nextSession}</li>
      <li className="schedule"><i className="fas fa-caret-right" />Length: {length}</li>
      <li className="schedule"><i className="fas fa-caret-right" />Link: <a className="apply-link" href={url}>apply</a></li>
    </ul>
    <a className="button" href={video}>Check Video</a>
  </div>
);
