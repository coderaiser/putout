const a = async (): Promise<number> => {
    return 5;
}

export async function fetchRandomJoke(): Promise<Joke> {
    return {
        id: 0,
        setup: 'I told my therapist about my stage fright.',
        punchline: 'She said, "Break a leg." Now I have two problems.',
    };
}
