export function numberParser(precision) {
  return (v) => {
    v = v.replace(/[^\d-.]+/g, "");
    const reg = /([^.]*)\.(.*)/;
    const m = v.match(reg);
    if (!m) {
      return v;
    }
    return m[1] + "." + m[2].replace(/\./g, "").slice(0, precision);
  };
}
