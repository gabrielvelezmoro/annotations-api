import { container } from "tsyringe";

import "@shared/container/providers";

import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { UserRepository } from "@modules/authentication/infra/typeorm/repositories/user-repository";
import { IPessoaRepository } from "@modules/operation/repositories/i-pessoa-repository";
import { PessoaRepository } from "@modules/operation/infra/typeorm/repositories/pessoa-repository";
import { IAnotacaoRepository } from "@modules/operation/repositories/i-anotacao-repository";
import { AnotacaoRepository } from "@modules/operation/infra/typeorm/repositories/anotacao-repository";
import { UserTokenRepository } from "@modules/authentication/infra/typeorm/repositories/user-token-repository";
import { IUserTokenRepository } from "@modules/authentication/repositories/i-user-token-repository";

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IPessoaRepository>(
  "PessoaRepository",
  PessoaRepository
);
container.registerSingleton<IAnotacaoRepository>(
  "AnotacaoRepository",
  AnotacaoRepository
);
