const isParser = ({rule}) => rule.startsWith('parser');

function getDOM(overrides = {}) {
    const {
        link = {},
        getCurrentDirPath = stub(),
        getCurrentDirName = stub(),
        getByDataName = stub(),
        isContainClass = stub(),
        getCurrentType = stub(),
        getCurrentPath = stub(),
    } = overrides;
}
