node && node.type === 'Program';
node || node.type === 'Program';

return node && typeof node === 'object' && !this.isArray(node);
