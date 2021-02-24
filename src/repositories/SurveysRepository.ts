import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

/**
 * Atribuindo herança ao SurveysRepository
 */
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };
