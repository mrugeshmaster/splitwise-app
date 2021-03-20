import React, { Component } from 'react';
import Select from 'react-select';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({
        selectedOption,
      });
      this.props.onSearchName(selectedOption.value);
    } else {
      this.setState({
        selectedOption,
      });
    }
  }

  render() {
    // console.log(`Props: ${JSON.stringify(this.props.names)}`);
    // let searchList = {};
    // if (this.props.name && this.props.names.length > 0) {
    const searchList = this.props.names.map((name) => ({
      value: name,
      label: name,
    }));
    // }
    return (
      <div>
        <Select
          className="required"
          value={this.state.selectedOption}
          options={searchList}
          onChange={this.handleChange}
          placeholder="Search..."
          openMenuOnClick={false}
          classNamePrefix="select"
          isClearable
          isSearchable
        />
      </div>
    );
  }
}
export default SearchBar;
