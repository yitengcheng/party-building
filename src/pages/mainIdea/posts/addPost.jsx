import React, { Component } from "react";
import { Layout, Form, Row } from "antd";
import {
  config,
  TextFormItem,
  DictFormItem,
  HeadFormItem,
  BraftEditor,
  SwitchFormItem,
} from "@/components";
import styles from "./index.module.css";
import PropTypes from "prop-types";

export default class Detail extends Component {
  static propTypes = {
    onClose: PropTypes.func,
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
            <HeadFormItem
              label="文章封面"
              labelCol={{ offset: 1, span: 3 }}
              wrapperCol={{ span: 4 }}
            />
            <Row>
              <SwitchFormItem label="状态" />
              <TextFormItem label="文章标题" />
            </Row>
            <Row>
              <DictFormItem label="文章分类" />
              <DictFormItem label="文章标签" />
            </Row>
            <BraftEditor
              onChange={(content) => {
                this.setState({ content });
              }}
            />
          </Form>
        </Form.Provider>
      </Layout>
    );
  }
}
