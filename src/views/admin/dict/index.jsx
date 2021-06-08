import React from "react";
import styles from "./index.module.css";
import { MyTable } from "@/components";
import { fetchList, delObj, fetchItemList, delItemObj } from "@/api/admin/dict";
import { dictType } from "@/api/dict";
import { Space, Button, Modal, Layout, Menu, message } from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DictDetail from "./detail";
import ItemDetail from "./itemDetail";

const { Sider } = Layout;

export default class DictContainer extends React.Component {
  itemColumns = [
    { title: "字典项", dataIndex: "label", width: 150 },
    { title: "字典值", dataIndex: "value", width: 150 },
    {
      title: "操作",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() =>
              this.setState({
                itemVisible: true,
                modalItemFlag: false,
                item: record,
              })
            }
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => this.delDictItem(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  columns = [
    { title: "类型", dataIndex: "type", width: 180 },
    { title: "描述", dataIndex: "description", width: 180 },
    {
      title: "操作",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() =>
              this.setState({
                dictVisible: true,
                modalFlag: false,
                dict: record,
              })
            }
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => this.delDict(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  componentDidMount() {
    this.getTreeData();
    this.getData();
  }
  state = {
    tableData: [],
    dictVisible: false,
    modalFlag: true,
    modalItemFlag: true,
    item: {},
    dict: {},
    itemData: [],
    typeData: [],
  };
  getTreeData() {
    dictType()
      .then((res) => {
        const { data } = res.data;
        let typeData = [];
        data.forEach((item) => {
          let obj = {};
          obj.key = item.value;
          obj.title = item.label;
          typeData.push(obj);
        });
        this.setState({ typeData });
      })
      .catch();
  }
  getData(pageNo) {
    const { system, description } = this.state;
    fetchList({
      description,
      system,
      current: pageNo || 1,
      size: 10,
    }).then((res) => {
      this.setState({
        tableData: res.data.data,
        dictVisible: false,
        pageNo: res.data.data.current,
      });
    });
  }
  getItemData(pageNo) {
    const { selectDict } = this.state;
    fetchItemList({
      dictId: selectDict.id,
      current: pageNo || 1,
      size: 10,
    })
      .then((res) => {
        this.setState({
          itemData: res.data.data,
          pageNO: res.data.data.current,
        });
      })
      .catch();
  }
  addDict() {
    const { modalFlag } = this.state;
    this.detail.addDict(modalFlag);
  }
  delDict(id) {
    Modal.confirm({
      title: "确定删除该字典?",
      centered: true,
      onOk: () => {
        delObj(id).then(() => {
          this.getData(this.state.pageNo);
        });
      },
    });
  }
  delDictItem(id) {
    Modal.confirm({
      title: "确定删除该字典项?",
      centered: true,
      onOk: () => {
        delItemObj(id).then(() => {
          this.setState({ itemVisible: false }, () => {
            this.getItemData(this.state.pageNO);
          });
        });
      },
    });
  }
  addDictItem() {
    const { modalItemFlag } = this.state;
    this.itemDetail.addDictItem(modalItemFlag);
  }
  render() {
    const {
      tableData,
      dictVisible,
      modalFlag,
      dict,
      itemData,
      typeData,
      itemVisible,
      modalItemFlag,
      item,
      selectDict,
    } = this.state;
    return (
      <Layout className={styles.container}>
        <Sider theme="light" width={240}>
          <Button icon={<PlusOutlined />} type="primary">
            新增分类
          </Button>
          <Menu>
            {typeData.map((v, k) => (
              <Menu.Item
                key={v.key}
                style={{ color: "black" }}
                onClick={(e) => {
                  this.setState({ system: e.key }, () => {
                    this.getData();
                  });
                }}
              >
                {v.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Sider theme="light" width={700}>
          <MyTable
            columns={this.columns}
            dataSource={tableData}
            onChange={(pageNo) => this.getData(pageNo)}
            handleAdd={() => {
              this.setState({ dictVisible: true, modalFlag: true, dict: {} });
            }}
            onRowClick={(row) => {
              this.setState({ selectDict: row }, () => {
                this.getItemData();
              });
            }}
            onSearch={(text) => {
              this.setState({ description: text }, () => {
                this.getData();
              });
            }}
            placeholder="请输入描述进行查找"
            addtext="新增数据字典"
          />
        </Sider>
        <Sider theme="light" width={700}>
          <MyTable
            columns={this.itemColumns}
            dataSource={itemData}
            onChange={(pageNo) => this.getItemData(pageNo)}
            handleAdd={() => {
              if (!selectDict) {
                return message.error("请选择一个字典进行添加");
              }
              this.setState({
                itemVisible: true,
                modalItemFlag: true,
                item: {},
              });
            }}
            addtext="新增数据字典项"
          />
        </Sider>
        {dictVisible && (
          <Modal
            title={modalFlag ? "新增" : "编辑"}
            visible={dictVisible}
            width={1000}
            onOk={() => this.addDict()}
            onCancel={() => {
              this.setState({ dictVisible: false });
            }}
            okText="保存"
            cancelText="取消"
            centered
          >
            <DictDetail
              getData={() => this.getData(this.state.pageNo)}
              dict={dict}
              ref={(ref) => {
                this.detail = ref;
              }}
            />
          </Modal>
        )}
        {itemVisible && (
          <Modal
            title={modalItemFlag ? "新增" : "编辑"}
            visible={itemVisible}
            width={1000}
            onOk={() => this.addDictItem()}
            onCancel={() => {
              this.setState({ itemVisible: false });
            }}
            okText="保存"
            cancelText="取消"
            centered
          >
            <ItemDetail
              item={item}
              dict={selectDict}
              getDictItem={() => {
                this.setState({ itemVisible: false }, () => {
                  this.getItemData(this.state.pageNO);
                });
              }}
              ref={(ref) => {
                this.itemDetail = ref;
              }}
            />
          </Modal>
        )}
      </Layout>
    );
  }
}
