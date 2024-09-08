import { bcrypt } from "../../config/bcrypt";
import { JWTAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgresql";
import { User } from "../controllers/auth/user.interface";

export class AuthService {
  public registerUser = async (userData: User) => {
    const { email, password } = userData;
    try {
      const isEmailRegistered = await this.checkIfEmailIsRegistered(email);
      if (isEmailRegistered) return { message: "Email already registered" };

      const hashedPassword = await bcrypt.hashed(password);
      const newUser = await prisma.users.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      const token = await JWTAdapter.generateToken({ userId: newUser.id });

      return {
        id: newUser.id,
        email: newUser.email,
        token,
      };
    } catch (error) {
      console.error("Error during user registration:", error);
      throw new Error("Failed to register user.");
    }
  };

  public loginUser = async (userData: User) => {
    const { email, password } = userData;
    try {
      const user = await this.checkIfEmailIsRegistered(email);
      if (!user) return { message: "Email not valid" };

      const match = await bcrypt.compare(password, user.password);
      if (!match) return { message: "Passowrd is not valid" };

      const token = await JWTAdapter.generateToken({ userId: user.id });

      return {
        id: user.id,
        email: user.email,
        token,
      };
    } catch (error) {
      console.error("Error during user login:", error);
      throw new Error("Failed to login.");
    }
  };

  private checkIfEmailIsRegistered = async (email: string) => {
    try {
      const user = await prisma.users.findFirst({
        where: { email },
      });
      return user ? user : false;
    } catch (error) {
      console.error("Error checking email registration:", error);
      throw new Error("Failed to check email registration.");
    }
  };
}
