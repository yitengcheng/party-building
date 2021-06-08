import React from "react";
import { Select } from "antd";
import dictRequest from "@/api/dict.js";
import PropTypes from "prop-types";

const { Option } = Select;

export default class DictSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  static propTypes = {
    dictType: PropTypes.string.isRequired,
    filter: PropTypes.func,
  };

  componentDidMount() {
    dictRequest(this.props.dictType).then((value) => {
      let data = value.data.data;
      if (this.props.filter) {
        data = data.filter(this.props.filter);
      }
      this.setState({
        options: data,
      });
    });
  }

  render() {
    const { dictType, filter, ...rest } = this.props;
    return (
      <Select {...rest}>
        {this.state.options.map((item) => (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }
}
