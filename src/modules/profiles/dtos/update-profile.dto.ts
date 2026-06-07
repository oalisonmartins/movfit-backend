import { PartialType } from '@nestjs/swagger'
import { SetPersonalInfosDto } from 'src/modules/onboarding/dtos/set-personal-infos.dto'

export class UpdateProfileDto extends PartialType(SetPersonalInfosDto) {}
