import React, {useState} from 'react';

module.exports = FormLoginContainer;

function FormLoginContainer() {
    const [loading, setLoading] = useState(false);

    function onClick() {
        setLoading(true);
    }

    return (
        <FormLogin
            onClick={ onClick }
            loading={ loading }
        />
    );
}

