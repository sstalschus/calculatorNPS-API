import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {

  async execute(req: Request, res: Response){
    const { email, survey_id} = req.body

    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const userAlreadyExists = await usersRepository.findOne({email})

    if(!userAlreadyExists) {
      return res.status(400).json({
        error: 'User does not exists!'
      })
    }

    const survey = await surveysRepository.findOne({id: survey_id})

    if(!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      })
    }

    // salvar informações na table surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    })
    await surveysUsersRepository.save(surveyUser)

    // enviar email para o usuário
    
    await SendMailService.execute(email, survey.title, survey.description)

    


    return res.json(surveyUser)
  }
}

export { SendMailController }