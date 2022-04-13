export default (data: unknown): boolean => {
  if (data === undefined || data === null) {
    return false;
  }

  return true;
};
