const { rolePermissions } = require('../utils/rolePermissions');

const hasPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({ message: 'User role not found' });
    }
    const permissions = rolePermissions[userRole] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = { hasPermission };
