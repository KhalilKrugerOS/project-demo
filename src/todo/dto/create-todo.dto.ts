import { StatusType } from "../ENUMS/status.enums";

export class CreateTodoDto {
    name: string;
    description: string;
    status: StatusType;
    createdAt: Date;
}
