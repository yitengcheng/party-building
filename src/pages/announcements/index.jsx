import React, { Component } from "react";
import { Button, Layout, Space, Modal, Form } from "antd";
import {
  MyTable,
  TextFormItem,
  DictFormItem,
  DateRangeFormItem,
} from "@/components";
import styles from "./index.module.css";
import Detail from "./detail";

export default class UserControl extends Component {
  columns = [
    {
      title: "序号",
      render: (text, record, index) => (
        <span>{(this.state.pageNo - 1) * this.state.pageSize + index + 1}</span>
      ),
      width: 80,
    },
    {
      title: "公告标题",
      width: 80,
    },
    {
      title: "状态",
      width: 80,
    },
    {
      title: "创建时间",
      width: 80,
    },
    {
      title: "创建人",
      width: 80,
    },
    {
      title: "内容",
      width: 80,
    },
    {
      title: "操作栏",
      fixed: "right",
      width: 80,
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() =>
              this.setState({
                visible: true,
                modalFlag: false,
                detail: record,
              })
            }
          >
            查看按钮
          </Button>
          <Button
            type="ghost"
            danger
            size="small"
            onClick={() => this.delNotice()}
          >
            删除按钮
          </Button>
        </Space>
      ),
    },
  ];
  state = {
    tableData: [],
    pageNo: 1,
    pageSize: 10,
    visible: false,
    modalFlag: false,
  };
  getData(pageNo) {}
  delNotice() {
    Modal.confirm({
      content: "是否确认删除此条公告",
      onOk: () => {},
    });
  }
  onSearch() {
    this.form
      .validateFields()
      .then((values) => {
        this.setState({ ...values });
      })
      .catch();
  }
  render() {
    const { tableData, visible, modalFlag, detail } = this.state;
    return (
      <Layout className={styles.container}>
        <MyTable
          rowKey="id"
          columns={this.columns}
          dataSource={tableData}
          onChange={(pageNo) => this.getData(pageNo)}
          tableHeader={
            <div className={styles.tableHead}>
              <Form
                layout="inline"
                ref={(ref) => {
                  this.form = ref;
                }}
              >
                <TextFormItem
                  required={false}
                  placeholder="输入公告标题"
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DictFormItem
                  required={false}
                  placeholder="请选择状态"
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DateRangeFormItem
                  required={false}
                  placeholder={["起始发布时间", "结束发布时间"]}
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
              </Form>
              <Space style={{ marginBottom: "16px" }}>
                <Button type="primary" onClick={() => this.onSearch()}>
                  搜索
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ visible: true, modalFlag: true });
                  }}
                >
                  新增
                </Button>
              </Space>
            </div>
          }
        />
        <Modal
          title={modalFlag ? "新增公告" : "查看公告"}
          visible={visible}
          width={600}
          onCancel={() => this.setState({ visible: false })}
        >
          <Detail
            onClose={() => {
              this.setState({ visible: false });
            }}
            detail={detail}
          />
        </Modal>
      </Layout>
    );
  }
}
