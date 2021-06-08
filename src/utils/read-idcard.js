/**
 * 前端读取身份证数据
 * 使用时需要在本地安装读卡服务
 */
import jsonp from "jsonp";

const readSFZ = () => {
  return new Promise((resolve, reject) => {
    jsonp("http://127.0.0.1:6045/readIDCard", (resultInfo, status) => {
      if (status.result === 0) {
        const textInfo = status.wzInfo;
        const data = {
          name: textInfo.substr(0, 15).trim(),
          genderid: textInfo.substr(16, 2).trim(),
          nationid: textInfo.substr(16, 2).trim(),
          birthdate: textInfo.substr(18, 8).trim(),
          address: textInfo.substr(26, 35).trim(),
          idnumber: textInfo.substr(61, 18).trim(),
          signorgan: textInfo.substr(79, 15).trim(),
          beginterm: textInfo.substr(94, 8).trim(),
          endterm: textInfo.substr(102, 8).trim(),
        };
        resolve(data);
      } else {
        reject(status);
      }
    });
  });
};

export default readSFZ;
