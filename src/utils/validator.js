// 数字，英文
export function checkNoAndEng(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[a-zA-Z0-9]*$/.test(value)) {
    return Promise.reject("请输入英文，数字");
  } else {
    return Promise.resolve();
  }
}

// 汉字，英文
export function checkCnAndEng(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[a-zA-Z\u4e00-\u9fa5]*$/.test(value)) {
    return Promise.reject("请输入英文，汉字");
  } else {
    return Promise.resolve();
  }
}

// 数字，英文，中文
export function checkText(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(value)) {
    return Promise.reject("请输入中文，英文，数字");
  } else {
    return Promise.resolve();
  }
}

// 数字，符号
export function checkNoAndSymbol(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[0-9~'!@#￥$%^&*()-+_=:?/.，。、《》|’“”；·]*$/.test(value)) {
    return Promise.reject("请输入数字，符号");
  } else {
    return Promise.resolve();
  }
}

// 数字
export function checkNo(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[0-9]*$/.test(value)) {
    return Promise.reject("请输入数字");
  } else {
    return Promise.resolve();
  }
}

// 金额验证保留2位小数
export function checkAmount(rule, value, callback) {
  if (!value) {
    return Promise.resolve();
  } else if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
    return Promise.reject("请输入正数且最多保留2位小数");
  } else {
    return Promise.resolve();
  }
}

// 邮箱验证
export function checkEmail(rule, value, callback) {
  if (value && !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
    return Promise.reject("请输入正确的邮箱地址");
  } else {
    return Promise.resolve();
  }
}

// 身份证验证
export function checkIdNo(rule, idNo, callback) {
  if (
    idNo &&
    !/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(
      idNo
    )
  ) {
    return Promise.reject("请输入正确身份证号");
  }
  return Promise.resolve();
}

// 手机号码
export function checkPhone(rule, value, callback) {
  if (value && !/^[1]([3-9])[0-9]{9}$/.test(value)) {
    return Promise.reject("请输入正确的电话号码");
  } else {
    return Promise.resolve();
  }
}

// 银行卡号
export function checkBankAccount(rule, value, callback) {
  if (!/[1-9]\d{11,19}$/.test(value)) {
    return Promise.reject("请输入正确的银行卡号");
  } else {
    return Promise.resolve();
  }
}

// 统一社会信用代码（支持老工商注册码）
export function checkSocialCreditCode(rule, value, callback) {
  if (
    !/^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(
      value
    )
  ) {
    return Promise.reject("请输入正确统一社会信用代码");
  } else {
    return Promise.resolve();
  }
}
