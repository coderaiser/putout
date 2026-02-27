{
    import os from 'os';

    const HOME = os.homedir();
}
{
    import chai from 'chai';

    chai
        .use(chaiJestSnapshot)
        .should(chaiJestSnapshot);
}
