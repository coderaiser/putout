export const replace = () => ({
  'const __a = reatomComponent(__b)': 'const __a = reatomComponent(__b, "__a")',
});
