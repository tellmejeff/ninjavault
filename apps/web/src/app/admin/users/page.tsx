'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../components/AuthContext';
import { useRouter } from 'next/navigation';
import { UserRole, ROLE_PRIVILEGES } from '@ninjavault/users/types';

interface User {
  id: string;
  email: string;
  name?: string;
  roles: UserRole[];
}

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    email: string;
    roles: UserRole[];
    password: string;
  }>({
    name: '',
    email: '',
    roles: [],
    password: '',
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user || !user.roles.includes('admin')) {
        router.push('/');
      } else {
        fetchUsers();
      }
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email,
      roles: user.roles,
      password: '', // Don't show password
    });
    setEditDialogOpen(true);
    setUpdateError('');
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleRoleChange = (role: UserRole) => {
    const newRoles = editForm.roles.includes(role)
      ? editForm.roles.filter((r) => r !== role)
      : [...editForm.roles, role];
    setEditForm({ ...editForm, roles: newRoles });
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setUpdateLoading(true);
    setUpdateError('');

    try {
      const updates: any = {
        name: editForm.name,
        email: editForm.email,
        roles: editForm.roles,
      };

      if (editForm.password) {
        updates.password = editForm.password;
      }

      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update user');
      }

      await fetchUsers();
      handleEditClose();
    } catch (err: any) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);

  if (authLoading || (loading && users.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Administration
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Search users by name or email"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name || '-'}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    {u.roles.map(role => (
                      <Chip key={role} label={role} size="small" sx={{ mr: 0.5 }} />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEditClick(u)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User: {editingUser?.email}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {updateError && <Alert severity="error">{updateError}</Alert>}
            <TextField
              label="Name"
              fullWidth
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Roles</FormLabel>
              <FormGroup>
                {(Object.keys(ROLE_PRIVILEGES) as UserRole[]).map((role) => (
                  <FormControlLabel
                    key={role}
                    control={
                      <Checkbox
                        checked={editForm.roles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                        name={role}
                      />
                    }
                    label={role.charAt(0).toUpperCase() + role.slice(1)}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <TextField
              label="New Password (leave blank to keep current)"
              fullWidth
              type="password"
              value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            disabled={updateLoading}
          >
            {updateLoading ? 'Updating...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
