import "../../../node_modules/braft-editor/dist/index.css";
import React from "react";
import BraftEditor from "braft-editor";
import PropTypes from "prop-types";

export default class Editor1 extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
  };
  static propTypes = {
    val: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
  };

  async componentDidMount() {
    this.setState({
      editorState: BraftEditor.createEditorState(this.props.val),
    });
  }
  render() {
    const { editorState } = this.state;

    return (
      <div
        style={{
          width: this.props.width,
          display: "inline-block",
          lineHeight: "24px",
        }}
      >
        <BraftEditor
          defaultValue={this.props.val}
          value={editorState}
          onChange={this.handleChange}
          onSave={this.submitContent}
          style={{ height: this.props.height || "200px" }}
        />
      </div>
    );
  }
  handleChange = (editorState) => {
    const htmlString = editorState.toHTML();
    this.setState({ editorState: editorState }, () => {
      console.log("---", htmlString);
      this.props.onChange(htmlString);
    });
  };
}
