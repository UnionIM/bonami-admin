export const sortArr = (arr: any[], property: string, direction: 1 | -1) => {
  return [...arr].sort((a, b) => {
    if (typeof a[property] === "string") {
      return (
        (a[property].toLowerCase() < b[property].toLowerCase()
          ? -1
          : a[property].toLowerCase() > b[property].toLowerCase()
          ? 1
          : 0) * direction
      );
    } else {
      return (
        (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0) *
        direction
      );
    }
  });
};
