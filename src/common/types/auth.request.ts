import { User } from 'src/domain/entity/user.entity';

export default class AuthRequest extends Request {
  user: User;
}
