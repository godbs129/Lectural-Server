export default (roles: number[], userRole: number): boolean => {
  for (const role of roles) {
    if (role === userRole) {
      return true;
    }
  }

  return false;
};
