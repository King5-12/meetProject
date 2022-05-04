import React from 'react';
import { Button, Input } from 'antd';

import styles from './styles.less';

const { TextArea } = Input;

const avatar = 'http://q.qlogo.cn/headimg_dl?dst_uin=31502034&spec=100';

enum ContentType {
    self = 'self',
    other = 'other',
}
interface ChatItemValue {
    type: ContentType;
    content: {
        data: string;
    };
    name: string;
}
const ChatItem = ({ value }: { value: ChatItemValue }) => {
    return (
        <div className={styles[`chat-room-message-item-${value.type}`]}>
            <div className={styles['chat-room-message-item-title']}>
                <div className={styles['chat-room-message-item-avatar']}>
                    <img src={avatar} alt="" />
                </div>
                <div className={styles['chat-room-message-item-name']}>
                    {value.name}
                </div>
            </div>
            <div className={styles['chat-room-message-item-text']}>
                {value.content.data}
            </div>
        </div>
    );
};

const msg: ChatItemValue[] = [
    {
        type: ContentType.other,
        name: 'myName',
        content: {
            data: '1234',
        },
    },
    {
        type: ContentType.other,
        name: 'myName',
        content: {
            data: '1234',
        },
    },
    {
        type: ContentType.other,
        name: 'myName',
        content: {
            data: '1234',
        },
    },
    {
        type: ContentType.self,
        name: 'myName',
        content: {
            data: 'sdfsdfsdf',
        },
    },
    {
        type: ContentType.self,
        name: 'myName',
        content: {
            data: 'sdfsdfsdf',
        },
    },
    {
        type: ContentType.self,
        name: 'myName',
        content: {
            data: 'sdfsdfsdf',
        },
    },
    {
        name: 'myName',
        type: ContentType.other,
        content: {
            data: '1234',
        },
    },
    {
        name: 'myName',
        type: ContentType.self,
        content: {
            data: 'sdfsdfsdf',
        },
    },
    {
        name: 'myName',
        type: ContentType.other,
        content: {
            data: '1234',
        },
    },
    {
        name: 'myName',
        type: ContentType.self,
        content: {
            data: 'sdfsdfsdf',
        },
    },
];
const ChatRoom = () => {
    return (
        <div className={styles['chat-box']}>
            <div className={styles['chat-room-message-box']}>
                <div className={styles['chat-room-message-title']}>
                    <div>【群聊】</div>
                </div>
                <div className={styles['chat-room-message-list']}>
                    {msg.map((item, index) => {
                        return <ChatItem value={item} key={index} />;
                    })}
                </div>
            </div>
            <div className={styles['chat-room-input-box']}>
                <TextArea
                    className={styles['chat-room-input-textarea']}
                    placeholder={'请输入你需要发送的内容'}
                />
                <div className={styles['chat-room-input-btn']}>
                    <Button onClick={() => {}}>发送</Button>
                </div>
            </div>
        </div>
    );
};
export default ChatRoom;
