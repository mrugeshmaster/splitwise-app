/* eslint-disable prefer-template */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
// import { Form } from 'react-bootstrap';

class SearchBar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //   };
  // }

  // onChangeSearch = (e) => {
  //   this.setState({
  //     name: e.target.value,
  //   }, () => {
  //     console.log('Here' + this.state.name);
  //     console.log('props searchbar ' + JSON.stringify(this.props));
  //     const list = this.props.namesList.filter((item) => {
  //       console.log(`Before filter: ${item}`);
  //       if (item.toLowerCase().search(this.state.name) !== -1) {
  //         console.log('After filter : ' + item);
  //         return item;
  //       }
  //     });
  //     this.props.nameSearch(list);
  //   });
  // }

  render() {
    const namesContainer = this.props.names.map((eachName) => eachName);
    console.log(namesContainer);
    return (
      <div>
        {namesContainer}
      </div>
    );
  }
}
export default SearchBar;
