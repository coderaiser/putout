import {Controller} from '@nestjs/common';
import {Post} from '@nestjs/common';
import {Body} from '@nestjs/common';
import {Patch} from '@nestjs/common';
import {Param} from '@nestjs/common';
import {Get} from '@nestjs/common';
import {Module} from '@nestjs/common';
import {Injectable} from '@nestjs/common';

@Controller('api/v1/gist')
export class GistController {
    constructor(private readonly gistService: GistService) {}
    
    @Post()
    create(
        @Body() body: GistBody
    ) {
        return this.gistService.create(body);
    }
    
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: GistBody
    ) {
        return this.gistService.update(id, body);
    }
    
    @Post(':id/:revision')
    fork(
        @Param('id') id: string,
        @Param('revision') revision: string,
        @Body() body: GistBody
    ) {
        return this.gistService.fork(body);
    }
    
    @Get(':id/:revision')
    load(
        @Param('id') id: string,
        @Param('revision') revision: string
    ) {
        return this.gistService.load(id, revision);
    }
}

@Module({
    controllers: [GistController],
    providers: [
        GistService,
    ],
    exports: [],
})
export class GistModule {}

@Injectable()
export class GistService {
    constructor(private readonly githubService: GithubService) {}
    
    async load(gistId: string, revisionId?: string) {
        return this.githubService.load(gistId, revisionId);
    }
}
