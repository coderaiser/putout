try {
  isValidPackageJson('path/to/');
} catch (error) {
  // @ts-ignore
  expect(error.message).toMatch(
    'No package name provided in package.json',
  );
}

try {
  isValidPackageJson('path/to/');
} catch (error) {
  // @ts-ignore
  expect(error.message).toMatch(
    'No package name provided in package.json',
  );
}
