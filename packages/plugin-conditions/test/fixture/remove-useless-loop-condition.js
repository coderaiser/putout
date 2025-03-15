while (currentDirPath = getParentDirectory(currentDirPath)) {
    if (!currentDirPath)
        break;
}

while (currentDirPath = getParentDirectory(currentDirPath)) {
    if (!currentDirPath)
        continue;
}