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
    console.log(`Props: ${this.props.names}`);
    const searchList = this.props.names.map((name) => ({
      value: name,
      label: name,
    }));
    return (
      <div>
        <Select
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
