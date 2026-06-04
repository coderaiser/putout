__putout_processor_yaml({
    "jobs": {
        "build": {
            "steps": [
                {
                    "name": "Install Rust",
                    "run": "rustup update",
                },
                {
                    "uses": "actions/cache@v5",
                    "with": {
                        "path": [
                            "~/.cargo/bin/",
                            "~/.cargo/registry/index/",
                            "~/.cargo/registry/cache/",
                            "~/.cargo/git/db/",
                            "target/",
                        ],
                        "key": "${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}",
                    },
                },
                {
                    "name": "Typos Install",
                    "run": "which typos || cargo install typos-cli",
                },
                {
                    "name": "Typos",
                    "run": "typos --write-changes",
                },
            ],
        },
    },
});

// no steps
__putout_processor_yaml({
    "jobs": {
        "build": {
        },
    },
})