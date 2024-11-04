import { Controller, Get, Inject } from '@nestjs/common';
import { CommonService } from './common.service';
import { UUID_TOKEN } from './uuid.provider';

@Controller('common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService,
    ) { }

    @Get()  // Handles GET /uuid
    generateUuid() {
        return {
            uuid: this.commonService.generateUUID(),
        };
    }
}
