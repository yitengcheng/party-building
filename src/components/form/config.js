export function getFormLayout(layout, formGroup, hasOffset) {
  if (formGroup) {
    return {};
  }
  return {
    labelCol: { span: layout && layout[0] ? layout[0] : 8 },
    wrapperCol: {
      span: layout ? (layout[1] ? layout[1] : 20 - layout[0]) : 12,
      offset: hasOffset ? (layout && layout[0] ? layout[0] : 8) : 0,
    },
  };
}
export function formatFileSize(size) {
  if (size >= 1048576) {
    // 1M
    return (size / 1048576).toFixed(2).replace(/\.?0*$/, "") + "M";
  }
  if (size >= 1024) {
    // 1K
    return (size / 1024).toFixed(2).replace(/\.?0*$/, "") + "K";
  }
  return size + "B";
}
