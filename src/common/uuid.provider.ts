import { v4 as uuidv4 } from 'uuid';
import { Provider } from '@nestjs/common';

export const UUID_TOKEN = 'UUID';

export const UuidProvider: Provider = {
    provide: UUID_TOKEN,
    useValue: uuidv4
};
