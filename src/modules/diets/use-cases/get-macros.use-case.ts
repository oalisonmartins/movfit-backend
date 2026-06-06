import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { calculateAge } from 'src/common/helpers/calculate-age.helper'
import { calculateMacros } from 'src/common/helpers/calculate-macros.helper'
import { calculateTdee } from 'src/common/helpers/calculate-tdee.helper'
import { calculateTmb } from 'src/common/helpers/calculate-tmb.helper'
import { RequestContextService } from 'src/common/services/request-context.service'

@Injectable()
export class GetMacrosUseCase {
  constructor(private readonly requestContext: RequestContextService) {}

  async execute() {
    const { generationType, goal } = this.requestContext.getDietPreference
    const { birthDate, biologicalSex, weightInKg, heightInCm } = this.requestContext.getProfile
    const { availableDaysPerWeek } = this.requestContext.getWorkoutPreference

    if (generationType !== 'MANUAL') {
      throw new HttpException(
        {
          message:
            'Você está no modo de geração automática de dieta. Altere para o modo manual ou utilize nossa geração automática de dieta',
          code: 'INVALID_GENERATION_TYPE',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const age = calculateAge(birthDate)
    const tmb = calculateTmb({ age, biologicalSex, heightInCm, weightInKg })
    const adjustedTdee = calculateTdee({ tmb, dietGoal: goal, availableDaysPerWeek })
    const macros = calculateMacros({ adjustedTdee, dietGoal: goal })

    return macros
  }
}
