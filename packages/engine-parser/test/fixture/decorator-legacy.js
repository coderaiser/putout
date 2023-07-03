class H extends Y {
    constructor(@IOptionsService optionsService: IOptionsService) {
        super();
        console.log(optionsService);
    }
}

alert(H);
