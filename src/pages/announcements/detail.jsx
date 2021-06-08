import React, { Component } from "react";
import { Layout, Form } from "antd";
import { config, TextFormItem, SwitchFormItem } from "@/components";
import styles from "./index.module.css";
import PropTypes from "prop-types";

export default class Detail extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    detail: PropTypes.object,
  };
  addNotice() {
    this.form
      .validateFields()
      .then((values) => {
        this.props.onClose();
      })
      .catch();
  }
  render() {
    const { detail } = this.props;
    return (
      <Layout>
        <Form.Provider onFormChange={() => {}}>
          <Form
            ref={(ref) => {
              this.form = ref;
            }}
            {...config.getFormLayout()}
            className={styles.form}
          >
            <TextFormItem label="公告标题" editing={!detail} />
            <TextFormItem label="公告内容" rows={10} editing={!detail} />
            <SwitchFormItem
              label="启用状态"
              value={{ status: true }}
              editing={!detail}
            />
          </Form>
        </Form.Provider>
      </Layout>
    );
  }
}
