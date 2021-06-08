import React from "react";
import styles from "./index.module.css";
import { config, TextFormItem, DictFormItem } from "@/components";
import { addObj, putObj } from "@/api/admin/dict";
import { Form, Row } from "antd";
import PropTypes from "prop-types";

export default class DictContainer extends React.Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
    dict: PropTypes.object.isRequired,
  };
  addDict(flag) {
    this.form
      .validateFields()
      .then((values) => {
        const { dict } = this.props;
        const func = flag ? addObj : putObj;
        values.id = dict.id || undefined;
        func(values)
          .then((res) => {
            this.props.getData(0);
          })
          .catch();
      })
      .catch((errors) => {
        console.log("-------", errors);
      });
  }
  render() {
    const { dict } = this.props;
    const { type, description, system, remarks } = dict;
    return (
      <Form
        {...config.getFormLayout()}
        ref={(ref) => {
          this.form = ref;
        }}
        className={styles.formBox}
        initialValues={dict}
      >
        <Row>
          <TextFormItem
            label="类型"
            value={{ type }}
            editing={!dict.id}
            getValueFromEvent={(event) =>
              event.target.value.replace(/\s+/g, "")
            }
          />
          <TextFormItem label="描述" value={{ description }} />
        </Row>
        <Row>
          <DictFormItem
            dictType="dict_type"
            label="字典类型"
            value={{ system }}
          />
          <TextFormItem label="备注" value={{ remarks }} required={false} />
        </Row>
      </Form>
    );
  }
}
