Boolean(node) && node.type === 'Program';

return Boolean(node) && typeof node === 'object' && !this.isArray(node);
