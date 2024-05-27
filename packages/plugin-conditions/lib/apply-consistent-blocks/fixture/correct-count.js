 if (isIdentifier(value)) {
            if (isUsed(path, value.name))
                return true;

            continue;
        }
