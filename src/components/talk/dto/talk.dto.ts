import { IsNotEmpty, IsSemVer, IsString } from "class-validator";


export class TalkDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    link: string;
}

export class AddAttendeeDto {
    @IsNotEmpty()
    @IsString()
    attendeeId: string;
}