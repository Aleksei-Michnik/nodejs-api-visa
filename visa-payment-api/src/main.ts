import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter} from './adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [`http://localhost:${process.env.VITE_PORT_HOST}`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use((req: { method: any; url: any; }, res: any, next: () => void) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.VISA_PAYMENT_API_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
