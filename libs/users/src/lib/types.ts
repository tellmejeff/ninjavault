export type UserRole = 'admin' | 'editor' | 'contributor' | 'student';

export type Privilege =
  | 'users:manage'
  | 'content:create'
  | 'content:edit'
  | 'content:delete'
  | 'content:publish'
  | 'courses:view'
  | 'courses:manage';

export const ROLE_PRIVILEGES: Record<UserRole, Privilege[]> = {
  admin: [
    'users:manage',
    'content:create',
    'content:edit',
    'content:delete',
    'content:publish',
    'courses:view',
    'courses:manage',
  ],
  editor: [
    'content:create',
    'content:edit',
    'content:delete',
    'content:publish',
    'courses:view',
  ],
  contributor: [
    'content:create',
    'courses:view',
  ],
  student: [
    'courses:view',
  ],
};

export function getUserPrivileges(roles: UserRole[]): Privilege[] {
  const privileges = new Set<Privilege>();
  roles.forEach((role) => {
    const rolePrivileges = ROLE_PRIVILEGES[role];
    if (rolePrivileges) {
      rolePrivileges.forEach((p) => privileges.add(p));
    }
  });
  return Array.from(privileges);
}

export function hasPrivilege(roles: UserRole[], privilege: Privilege): boolean {
  return getUserPrivileges(roles).includes(privilege);
}
