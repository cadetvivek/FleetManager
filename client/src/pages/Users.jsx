
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { users } from '../data/mockData';
import { Search, Filter, User, Shield, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const UserCard = ({ user }) => {
  // Helper function to format the last login date
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to determine the role icon and color
  const getRoleIconAndColor = (role) => {
    switch (role) {
      case 'admin':
        return { icon: <Shield size={16} />, color: 'text-red-500' };
      case 'manager':
        return { icon: <User size={16} />, color: 'text-blue-500' };
      case 'driver':
        return { icon: <User size={16} />, color: 'text-green-500' };
      default:
        return { icon: <User size={16} />, color: 'text-gray-500' };
    }
  };

  // Function to determine the status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-status-active/10 text-status-active';
      case 'inactive':
        return 'bg-status-inactive/10 text-status-inactive';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const { icon, color } = getRoleIconAndColor(user.role);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className={`${color}`}>{icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getStatusBadge(user.status)}`}>
              {user.status}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Login</p>
              <p className="font-medium">{formatLastLogin(user.lastLogin)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors">
            Edit
          </button>
          {user.status === 'active' ? (
            <button className="px-2 py-1 text-xs text-status-inactive hover:bg-status-inactive/10 rounded transition-colors">
              Disable
            </button>
          ) : (
            <button className="px-2 py-1 text-xs text-status-active hover:bg-status-active/10 rounded transition-colors">
              Enable
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [viewMode, setViewMode] = useState('grid');
  
  // Format the last login date
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(value) || 
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  // Function to display permissions in a readable format
  const formatPermissions = (permissions) => {
    if (permissions.includes('all')) {
      return 'All Permissions';
    }
    
    return permissions.map(p => p.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')).join(', ');
  };

  // Function to determine the status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 size={16} className="text-status-active" />;
      case 'inactive':
        return <XCircle size={16} className="text-status-inactive" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage system users and their access levels</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Add New User
          </button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or role..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Filter size={16} />
                  <span>Filter</span>
                </div>
                <select className="border rounded-md p-2 bg-background">
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="driver">Driver</option>
                </select>
                <select className="border rounded-md p-2 bg-background">
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex bg-muted rounded-md p-1">
                <button 
                  className={`px-3 py-1.5 rounded ${viewMode === 'grid' ? 'bg-background shadow' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-3 gap-0.5 h-4 w-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button 
                  className={`px-3 py-1.5 rounded ${viewMode === 'list' ? 'bg-background shadow' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="flex flex-col gap-0.5 h-4 w-4">
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <User size={16} />
              <span>All Users ({users.length})</span>
            </TabsTrigger>
            <TabsTrigger value="admin">Admin ({users.filter(u => u.role === 'admin').length})</TabsTrigger>
            <TabsTrigger value="manager">Manager ({users.filter(u => u.role === 'manager').length})</TabsTrigger>
            <TabsTrigger value="driver">Driver ({users.filter(u => u.role === 'driver').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(user.status)}
                            <span className="capitalize">{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={formatPermissions(user.permissions)}>
                            {formatPermissions(user.permissions)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            {user.status === 'active' ? (
                              <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Disable</button>
                            ) : (
                              <button className="p-1 text-status-active rounded hover:bg-status-active/10">Enable</button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="admin">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.filter(u => u.role === 'admin').map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.filter(u => u.role === 'admin').map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(user.status)}
                            <span className="capitalize">{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={formatPermissions(user.permissions)}>
                            {formatPermissions(user.permissions)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            {user.status === 'active' ? (
                              <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Disable</button>
                            ) : (
                              <button className="p-1 text-status-active rounded hover:bg-status-active/10">Enable</button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="manager">
            {/* Similar structure for manager users */}
          </TabsContent>
          <TabsContent value="driver">
            {/* Similar structure for driver users */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Users;

