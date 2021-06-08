import React from "react";
import dictRequest from "@/api/dict.js";
import _ from "lodash";
import { Tooltip } from "antd";

export default class DictShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      options: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps, prevState)) {
      return {
        ...nextProps,
      };
    }
    return null;
  }
  componentDidMount() {
    const { dictType } = this.state;
    dictRequest(dictType)
      .then((value) => {
        const { data } = value.data;
        this.setState({
          options: this._initData(data),
        });
      })
      .catch();
  }
  _initData(data) {
    let result = {};
    data.forEach((element) => {
      result[element.value] = element.label;
    });
    return result;
  }
  render() {
    const { value, options, title } = this.state;
    return (
      <Tooltip title={title} color="#f50">
        <span>{options[value] || ""}</span>
      </Tooltip>
    );
  }
}
