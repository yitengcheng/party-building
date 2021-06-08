import React from "react";
import { Modal, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import style from "@/layout/index.module.css";
import store from "@/redux/index";

export default class Lock extends React.Component {
  state = {
    modalVisible: false,
    password: "",
  };

  lockPage() {
    store.dispatch({
      type: "LOCK_PAGE",
      value: {
        flag: true,
        password: this.state.password,
      },
    });
  }

  render() {
    const { modalVisible, password } = this.state;

    return (
      <div>
        <div
          onClick={() => this.setState({ modalVisible: true })}
          className={style.link}
          style={{ fontSize: 20 }}
        >
          <LockOutlined />
        </div>

        {modalVisible && (
          <Modal
            visible={modalVisible}
            title="锁屏"
            width={500}
            centered
            onOk={this.lockPage.bind(this)}
            onCancel={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <Input.Password
              size="large"
              value={password}
              placeholder="请输入锁屏密码"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Modal>
        )}
      </div>
    );
  }
}
