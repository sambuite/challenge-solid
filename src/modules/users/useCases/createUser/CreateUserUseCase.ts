import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailTaken = this.usersRepository.findByEmail(email);

    if (emailTaken) {
      throw new Error("Email already taken!");
    }

    const userCreated = this.usersRepository.create({ email, name });

    return userCreated;
  }
}

export { CreateUserUseCase };
