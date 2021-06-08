import React from "react";
import _ from "lodash";
import moment from "moment";
import { Form, DatePicker } from "antd";
import styles from "./index.module.css";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class DateRangeFormItem extends React.Component {
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
  render() {
    const {
      label,
      value,
      editing = true,
      range = [],
      required = true,
      style,
      rules = [],
      labelCol,
      wrapperCol,
      ...otherProps
    } = this.state;
    required &&
      _.findIndex(rules, "required") === -1 &&
      rules.push({ required: true });
    const key = _.keys(value)[0];
    let disabledDate;
    if (range.length > 1) {
      const min = _.isArray(value[key]) && moment(range[0]);
      const max = _.isArray(value[key]) && moment(range[1]);
      disabledDate = (current) => {
        return (
          current &&
          (current.valueOf() < min.valueOf() ||
            current.valueOf() > max.valueOf())
        );
      };
    } else if (range.length > 0) {
      const min = moment(range[0]);
      disabledDate = (current) => {
        return current && current.valueOf() < min.valueOf();
      };
    }

    return (
      <FormItem
        label={label}
        className={styles.formItem}
        required={required}
        rules={rules}
        name={key}
        style={style}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <RangePicker
          disabledDate={disabledDate}
          disabled={!editing}
          style={{ width: "100%" }}
          {...otherProps}
        />
      </FormItem>
    );
  }
}
