export default (data: Object | string): boolean => {
  if (data === undefined || data === null) {
    return false;
  }

  return true;
};
