class SessionFilter {
  constructor(courses) {
    this.courses = courses
  }
  getSessionDate() {
    let yearSet = [];
    this.courses.filter(courseDate => {
      if (typeof(courseDate['Next Session Date']) === 'string' &&
        courseDate['Next Session Date'] !== 'Self paced' &&
        courseDate['Next Session Date'] !== undefined &&
        courseDate['Next Session Date'] !== NaN) {
        //console.log('catch string'); replace(/^\s+|\s+$|\s+(?=\s)/g, "")
        let yearStr = courseDate['Next Session Date'].split(',');
        if (yearStr[1] !== undefined) {
          let year = yearStr[1].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
          yearSet.push({
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
        yearSet.push({
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
    return yearSet
  }
}

export default SessionFilter;
