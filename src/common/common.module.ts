import { Module } from '@nestjs/common';
import { UuidProvider } from 'src/common/uuid.provider';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Module({
    imports: [],
    controllers: [CommonController],
    providers: [CommonService, UuidProvider],
    exports: [CommonService],
})
export class CommonModule { }
