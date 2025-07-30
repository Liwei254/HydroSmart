const rolePermissions = {
  admin: [
    'add_admins',
    'add_technicians',
    'add_regular_users',
    'view_all_assigned_boreholes',
    'view_real_time_data',
    'view_resolve_alerts',
    'view_log_maintenance',
    'assign_technicians',
    'set_thresholds',
    'view_reports_analytics',
    'download_borehole_data',
    'edit_borehole_config',
    'change_pump_settings',
    'delete_borehole',
    'language_unit_settings',
    'reset_user_passwords',
    'system_wide_settings'
  ],
  technician: [
    'add_technicians',
    'view_all_assigned_boreholes',
    'view_real_time_data',
    'view_resolve_alerts',
    'view_log_maintenance',
    'assign_technicians',
    'set_thresholds',
    'view_reports_analytics',
    'download_borehole_data',
    'edit_borehole_config',
    'change_pump_settings',
    'delete_borehole',
    'language_unit_settings',
    'reset_user_passwords'
  ],
  viewer: [
    'add_regular_users',
    'view_assigned_boreholes',
    'view_real_time_data',
    'view_resolve_alerts',
    'view_log_maintenance',
    'view_reports_analytics_limited',
    'language_unit_settings_personal',
    'reset_user_passwords_for_self'
  ],
  sensor: [
    'add_sensor_data'  // ✅ Arduino only permission
  ]
};

module.exports = { rolePermissions };
