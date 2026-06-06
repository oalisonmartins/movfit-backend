import { PartialType } from '@nestjs/swagger'
import { SetPersonalInfosDto } from 'src/modules/profiles/dtos/set-personal-infos.dto'

export class UpdatePersonalInfosDto extends PartialType(SetPersonalInfosDto) {}
