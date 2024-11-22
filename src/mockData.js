export const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: ['Admin'], status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: ['Editor'], status: 'Inactive' },
];

export const roles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
];

export const permissions = ['Read', 'Write', 'Delete'];
