import React, { Component } from "react";
import { Button, Layout, Space, Modal, Form } from "antd";
import {
  MyTable,
  TextFormItem,
  DictFormItem,
  DateRangeFormItem,
} from "@/components";
import styles from "./index.module.css";
import AddPost from "./addPost";

export default class Posts extends Component {
  columns = [
    {
      title: "序号",
      render: (text, record, index) => (
        <span>{(this.state.pageNo - 1) * this.state.pageSize + index + 1}</span>
      ),
      width: 80,
    },
    {
      title: "文章标题",
      width: 80,
    },
    {
      title: "分类",
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
      title: "评论总数",
      width: 80,
    },
    {
      title: "点赞总数",
      width: 80,
    },
    {
      title: "审核状态",
      width: 80,
    },
    {
      title: "标签",
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
                lookVisible: true,
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
    addVisible: false,
    lookVisible: false,
    modalFlag: false,
  };
  getData(pageNo) {}
  delNotice() {
    Modal.confirm({
      content: "是否确认删除此文章",
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
    const { tableData, addVisible } = this.state;
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
                  placeholder="输入文章标题"
                  allowClear
                  maxLength={40}
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DictFormItem
                  required={false}
                  placeholder="请选择分类"
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DateRangeFormItem
                  required={false}
                  placeholder={["起始发布时间", "结束发布时间"]}
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <TextFormItem
                  required={false}
                  placeholder="输入创建人电话"
                  allowClear
                  maxLength={40}
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DictFormItem
                  required={false}
                  placeholder="请选择审核状态"
                  allowClear
                  style={{ width: "260px", marginBottom: "16px" }}
                />
                <DictFormItem
                  required={false}
                  placeholder="请选择标签"
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
                    this.setState({ addVisible: true, modalFlag: true });
                  }}
                >
                  新增
                </Button>
              </Space>
            </div>
          }
        />
        <Modal
          title="新增文章"
          visible={addVisible}
          width={1200}
          onCancel={() => this.setState({ addVisible: false })}
        >
          <AddPost
            onClose={() => {
              this.setState({ addVisible: false });
            }}
          />
        </Modal>
      </Layout>
    );
  }
}
