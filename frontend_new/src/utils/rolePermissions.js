export const rolePermissions = {
  admin: [
    'add_admins',
    'delete_borehole',
    'view_resolve_alerts',
    'add_alerts',
    'edit_borehole_config',
    'view_real_time_data',
    // add other admin permissions here
  ],
  technician: [
    'add_technicians',
    'edit_borehole_config',
    'view_resolve_alerts',
    'add_alerts',
    'view_real_time_data',
    // add other technician permissions here
  ],
  viewer: [
    'view_assigned_boreholes',
    'view_real_time_data',
    'view_resolve_alerts',
    // add other viewer permissions here
  ],
};

export const hasPermission = (role, permission) => {
  return rolePermissions[role]?.includes(permission);
};
