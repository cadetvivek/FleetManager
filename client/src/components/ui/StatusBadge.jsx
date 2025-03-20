
import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const StatusBadge = ({ status, size = 'default' }) => {
  const sizeClasses = {
    small: 'text-xs px-1.5 py-0.5',
    default: 'text-sm px-2.5 py-1',
    large: 'text-base px-3 py-1.5'
  };
  
  const getStatusDetails = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          icon: CheckCircle2,
          className: 'bg-status-active/10 text-status-active'
        };
      case 'maintenance':
        return {
          label: 'Maintenance',
          icon: AlertTriangle,
          className: 'bg-status-maintenance/10 text-status-maintenance'
        };
      case 'inactive':
        return {
          label: 'Inactive',
          icon: XCircle,
          className: 'bg-status-inactive/10 text-status-inactive'
        };
      case 'available':
        return {
          label: 'Available',
          icon: CheckCircle2,
          className: 'bg-status-active/10 text-status-active'
        };
      case 'on-duty':
        return {
          label: 'On Duty',
          icon: AlertTriangle,
          className: 'bg-status-maintenance/10 text-status-maintenance'
        };
      case 'off-duty':
        return {
          label: 'Off Duty',
          icon: null,
          className: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        };
      case 'on-leave':
        return {
          label: 'On Leave',
          icon: XCircle,
          className: 'bg-status-inactive/10 text-status-inactive'
        };
      default:
        return {
          label: status,
          icon: null,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
    }
  };
  
  const { label, icon: Icon, className } = getStatusDetails();
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${className}`}>
      {Icon && <Icon size={size === 'small' ? 12 : 16} className="mr-1" />}
      {label}
    </span>
  );
};

export default StatusBadge;
