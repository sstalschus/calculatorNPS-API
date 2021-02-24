import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

/**
 * Atribuindo herança ao UsersRepository
 */
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository }