const options = {
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion,
            ecmaFeatures: {
                jsx: true,
            },
        }
    }
};

const options2 = {
    languageOptions: {
      parserOptions: {
        projectService: true,
      }
    },
};

const options3 = {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    },
};
