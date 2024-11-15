import { Inject, Injectable } from '@nestjs/common';
import { UUID_TOKEN } from 'src/common/uuid.provider';

@Injectable()
export class CommonService {
    constructor(@Inject(UUID_TOKEN) private readonly uuidGenerator: () => string) { }
    generateUUID(): string {
        return this.uuidGenerator();
    }
}
