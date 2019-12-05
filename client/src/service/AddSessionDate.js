/*
author: Debarun Mitra
Objective: Create course search application
file description: find the year from 'Next Session Date' field and add SessionDate field in courses
*/
class AddSessionDate {
  /**
   * [constructor]
   * @param courses [get all courses data from App.js]
   */
  constructor(courses) {
    this.courses = courses
  }
  /**
   * [getSessionDate]
   * @return  [return courses data with 'SessionDate' field]
   */
  getSessionDate() {
    let coursesWithSessionData = [];
    this.courses.filter(courseDate => {
      if (typeof(courseDate['Next Session Date']) === 'string' &&
        courseDate['Next Session Date'] !== 'Self paced') {
        let yearStr = courseDate['Next Session Date'].split(',');
        if (yearStr[1] !== undefined) {
          let year = yearStr[1].replace(/^\s+|\s+$|\s+(?=\s)/g, ""); // regex to replace whitespace from year string
          coursesWithSessionData.push({
            "Course Id": courseDate['Course Id'],
            "Course Name": courseDate['Course Name'],
            "Provider": courseDate['Provider'],
            "Universities/Institutions": courseDate['Universities/Institutions'],
            "Child Subject": courseDate['Child Subject'],
            "Url": courseDate['Url'],
            "SessionDate": parseInt(year),
            "Next Session Date": courseDate['Next Session Date'],
            "Length": courseDate['Length'],
            "Video(Url)": courseDate['Video(Url)']
          })
        }
      } else if (typeof(courseDate['Next Session Date']) === 'number') {
        coursesWithSessionData.push({
          "Course Id": courseDate['Course Id'],
          "Course Name": courseDate['Course Name'],
          "Provider": courseDate['Provider'],
          "Universities/Institutions": courseDate['Universities/Institutions'],
          "Child Subject": courseDate['Child Subject'],
          "Url": courseDate['Url'],
          "SessionDate": courseDate['Next Session Date'],
          "Next Session Date": courseDate['Next Session Date'],
          "Length": courseDate['Length'],
          "Video(Url)": courseDate['Video(Url)']
        })
      }
    });
    return coursesWithSessionData;
  }
}

export default AddSessionDate;
