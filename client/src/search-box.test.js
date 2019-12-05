import React from 'react';
import  shallow  from 'enzyme';
import SearchBox from './components/search-box/search-box.component';

describe('<SearchBox />',()=>{
  it('testing course component',()=>{
    const input=shallow(<SearchBox />);
    expect(input.find('input').length).toEqual(1);
  });
});
