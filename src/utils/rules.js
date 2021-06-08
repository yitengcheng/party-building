const rules = {
  path: /^\/[\w-#/]*$/, // 路径

  name: /^(?:[\u4e00-\u9fa5·]{2,16})$/, // 中文姓名

  username: /^[a-zA-Z0-9_-]{4,16}$/, // 用户名校验，4到16位（字母，数字，下划线，减号）

  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  tel: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/, // 国内座机

  // 身份证号 1/2代

  sfz: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,

  phone: /^(?:(?:\+|00)86)?1\d{10}$/, //手机号(mobile phone)中国(最宽松), 只要是1开头即可,

  //只能是中文，英文，数字的组合
  Text: /^[a-zA-Z0-9\u4e00-\u9fa5]*$/,

  // 标本code 只能输入数字和英文，只能是4位
  SpecimenCode: /^[a-zA-Z0-9]{4,4}$/,
  // 标本name 只能输入数字，英文，汉字，最多20字符
  SpecimenName: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,

  // 试管代码 只能输入数字和英文，最多12个字符
  TubeCode: /^[a-zA-Z0-9]{0,12}$/,
  // 试管名称 只能输入数字，英文，汉字，最多20字符
  TubeName: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,
  // 试管规格 只能输入数字，英文，汉字，最多20字符
  TubeSpecifications: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,

  // 套餐编码 套餐编码 只能输入12位英文数字
  mealCode: /^[a-zA-Z0-9]{0,10}$/,
};

export default rules;
