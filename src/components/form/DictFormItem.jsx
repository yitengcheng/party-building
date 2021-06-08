import React from "react";
import { Form, Select } from "antd";
import dictRequest from "@/api/dict.js";
import _ from "lodash";
import styles from "./index.module.css";

export default class DictFormItem extends React.Component {
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
    dictRequest(this.state.dictType).then((value) => {
      const { data } = value.data;
      let result = [];
      data.forEach((element) => {
        result.push({ label: element.label, value: element.value.trim() });
      });
      this.setState({
        options: result,
      });
    });
  }
  render() {
    const {
      label,
      value,
      editing = true,
      selectStyle,
      style,
      rules = [],
      required = true,
      dictType,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    return (
      <Form.Item
        label={label}
        style={style}
        className={styles.formItem}
        required={required}
        rules={rules}
        name={key}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Select
          style={selectStyle}
          placeholder={`请选择${label}`}
          disabled={!editing}
          {...otherProps}
        />
      </Form.Item>
    );
  }
}
