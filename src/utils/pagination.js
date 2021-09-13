export default {
  getPagination: (_current, _last) => {
    const current = parseInt(_current, 10);
    const last = parseInt(_last, 10);
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i = 0; i < range.length; i += 1) {
      const number = range[i];
      if (l) {
        if (number - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (number - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(number);
      l = number;
    }

    return rangeWithDots;
  },
};
