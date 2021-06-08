import React from "react";
import _ from "lodash";
import { Form, Input } from "antd";
import styles from "./index.module.css";
const TextArea = Input.TextArea;

export default class TextFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
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
  handleChange = (e) => {
    const { onChange } = this.state;
    if (onChange) {
      onChange(e.target.value);
    }
  };
  render() {
    let {
      label,
      value,
      placeholder,
      editing = true,
      rows,
      rules = [],
      style,
      getValueFromEvent,
      required = true,
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    const key = _.keys(value)[0];
    if (rows) {
      if (_.isArray(rows)) {
        if (rows.length === 1) {
          otherProps.autosize = { minRows: rows[0], maxRows: rows[0] };
        } else {
          otherProps.autosize = { minRows: rows[0], maxRows: rows[1] };
        }
      } else {
        otherProps.autosize = { minRows: rows, maxRows: rows };
      }
    }
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
        getValueFromEvent={getValueFromEvent}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        {rows ? (
          <TextArea
            placeholder={placeholder || `请输入${label}`}
            onChange={(e) => this.handleChange(e)}
            disabled={!editing}
            {...otherProps}
          />
        ) : (
          <Input
            placeholder={placeholder || `请输入${label}`}
            onChange={(e) => this.handleChange(e)}
            disabled={!editing}
            {...otherProps}
          />
        )}
      </Form.Item>
    );
  }
}
