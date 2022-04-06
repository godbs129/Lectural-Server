export default (roles: number[], userRole: number): boolean => {
  for (let role of roles) {
    if (role === userRole) {
      return true;
    }
  }

  return false;
};
