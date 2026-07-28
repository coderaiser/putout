const getLeagueFromMap = (leagueMap: Map<string, League>) => {
    return (league: NormalizedLeague): League => {
        return leagueMap.get(league.id)!;
    };
};

