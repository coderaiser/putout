const filteredLeagues = useMemo<League[]>(() => {
    const normalizedSearch = search.toLowerCase()
    return leagues.filter(Boolean);
}, [leagues, search, sport])

 const treeAdapter = useMemo(() => treeAdapterFromParseResult(parseResult, settings), [parseResult.treeAdapter, settings]);
