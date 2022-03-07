let packageJson;
try {
    packageJson = require(path.join(addonPath, 'package.json'));
} catch (e) {
// swallow as changing branches can leave folders around
}
