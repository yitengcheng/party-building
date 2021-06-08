/**
 * 年龄段输入组件
 */
import React, { useEffect, useState } from "react";
import { Input, InputNumber } from "antd";
import DictSelect from "@/components/dict-select";
import style from "./style.module.css";
import PropTypes from "prop-types";

const maxNum = 150; // 最大岁数

function Component(props) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxNum);
  const [max2, setMax2] = useState(maxNum);

  const produceMin = (data) => {
    if (data[0].unit === "1") {
      if (data[1].unit === "1") {
        setMin(data[0].value || 0);
      } else {
        setMin(data[0].value * 12);
      }
    } else {
      if (data[1].unit === "1") {
        setMin(Math.ceil(data[0].value / 12));
      } else {
        setMin(data[0].value || 0);
      }
    }
  };

  const produceMax = (data) => {
    if (data[0].unit === "1") {
      let value;
      if (data[1].unit === "1") {
        value = data[1].value;
      } else {
        value = Math.floor(data[1].value / 12);
      }
      // 注意这里 value可能是NaN
      if (value < maxNum) {
        setMax(value);
      } else {
        setMax(maxNum);
      }
    } else {
      let value;
      if (data[1].unit === "1") {
        value = data[1].value * 12;
      } else {
        value = data[1].value;
      }
      // 注意这里 value可能是NaN
      if (value < maxNum * 12) {
        setMax(value);
      } else {
        setMax(maxNum * 12);
      }
    }
  };

  const produceMax2 = (data) => {
    if (data[1].unit === "1") {
      setMax2(maxNum);
    } else {
      setMax2(maxNum * 12);
    }
  };

  useEffect(() => {
    produceMax(props.value);
    produceMin(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input.Group compact className={style.box} {...props}>
      <InputNumber
        value={props.value[0].value}
        min={0}
        max={max}
        precision={0}
        placeholder={props.placeholder[0]}
        onChange={(value) => {
          const data = [...props.value];
          data[0].value = value;
          props.onChange(data);
          produceMin(data);
        }}
        className={style.input}
      />

      <DictSelect
        value={props.value[0].unit}
        dictType="age-unit"
        onChange={(value) => {
          const data = [...props.value];
          data[0].unit = value;
          props.onChange(data);
          produceMax(data);
          produceMin(data);
        }}
      />

      <div className={style.inte}>至</div>

      <InputNumber
        value={props.value[1].value}
        min={min}
        max={max2}
        precision={0}
        placeholder={props.placeholder[1]}
        onChange={(value) => {
          const data = [...props.value];
          data[1].value = value;
          props.onChange(data);
          produceMax(data);
        }}
        className={style.input}
      />

      <DictSelect
        value={props.value[1].unit}
        dictType="age-unit"
        onChange={(value) => {
          const data = [...props.value];
          data[1].unit = value;
          props.onChange(data);
          produceMax(data);
          produceMin(data);
          produceMax2(data);
        }}
      />
    </Input.Group>
  );
}

Component.propTypes = {
  onChange: PropTypes.func, // 值改变时的回调
  value: PropTypes.array,
  placeholder: PropTypes.array,
};

Component.defaultProps = {
  onChange: () => {},
  value: [
    { value: undefined, unit: "1" },
    { value: undefined, unit: "1" },
  ],
  placeholder: ["年龄", "年龄"],
};

export default Component;
