import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';


async function bootstrap() {
  const serverConfig = {
    port: 5000,
    origin: 'http://www.workero.site',
  };

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }


  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());

  const port = process.env.PORT || serverConfig.port;
  app.enableCors();

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
