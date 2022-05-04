import { io } from 'socket.io-client';
import { message } from 'antd';

import { ERROR } from '@/constants';

// 配置 socket.io 路径
const url =
    process.env.NODE_ENV === 'production'
        ? 'http://121.89.204.99:8080'
        : 'localhost:8080';

console.log('socket io use url: ', url);

const socket = io(url, {
    transports: ['websocket'],
});

socket.on(ERROR, msg => {
    message.error(msg, 2);
});

export default socket;
