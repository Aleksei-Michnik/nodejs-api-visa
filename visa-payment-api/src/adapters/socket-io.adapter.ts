import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions) {
        return super.createIOServer(port, {
            cors: {
                origin: [`http://localhost:${process.env.VITE_PORT_HOST}`],
                methods: ['GET', 'POST'],
                credentials: true,
            },
            transports: ['websocket'],
        });
    }
}
