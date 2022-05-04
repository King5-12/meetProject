import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message } from 'antd';
import { history } from 'umi';

import styles from './styles.less';
import { loginTokenStorage } from '@/utils/storage';
import socket from '@/utils/socket';
import { JOIN, LEAVE, MSG } from '@/constants';

const { TextArea } = Input;

const avatar = 'http://q.qlogo.cn/headimg_dl?dst_uin=31502034&spec=100';

enum ContentType {
    self = 'self',
    other = 'other',
}
interface ChatItemValue {
    type: ContentType;
    data: string;
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
                {value.data}
            </div>
        </div>
    );
};
const ChatRoom = () => {
    const [msgList, setMsgList] = useState<ChatItemValue[]>([]);
    const [value, setValue] = useState('');
    const userName = useRef('');
    const msgListRef = useRef([]);
    useEffect(() => {
        userName.current = loginTokenStorage.get();
        console.log(userName.current);
        if (!userName.current) {
            history.push('/login');
        }
        // 监听数据
        socket.on(MSG, res => {
            const { user, msg } = res.data;
            console.log(res, 'msgres');
            msgListRef.current = [
                ...msgListRef.current,
                {
                    type: ContentType.other,
                    data: msg,
                    name: user,
                },
            ];
            setMsgList(msgListRef.current);
        });

        // 监听用户加入房间
        socket.on(JOIN, res => {
            console.log('JOIN res: ', res);
            message.info(`用户${res.data}加入群聊`);
        });

        // 监听用户离开事件
        socket.on(LEAVE, res => {
            console.log('LEAVE: ', res);
            if (res.data) message.info(`用户${res.data}离开群聊`);
        });
    }, []);

    const submitData = () => {
        if (value.trim() === '') {
            message.info('消息不能为空');
            setValue('');
            return;
        }
        msgListRef.current = [
            ...msgListRef.current,
            {
                type: ContentType.self,
                data: value.trim(),
                name: userName.current,
            },
        ];
        setMsgList(msgListRef.current);

        socket.emit(MSG, {
            data: { user: userName.current, msg: value },
        });
        setValue('');
    };
    return (
        <div className={styles['chat-box']}>
            <div className={styles['chat-room-message-box']}>
                <div className={styles['chat-room-message-title']}>
                    <div>【群聊】</div>
                </div>
                <div className={styles['chat-room-message-list']}>
                    {msgList.map((item, index) => {
                        return <ChatItem value={item} key={index} />;
                    })}
                </div>
            </div>
            <div className={styles['chat-room-input-box']}>
                <TextArea
                    className={styles['chat-room-input-textarea']}
                    placeholder={'请输入你需要发送的内容'}
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                />
                <div className={styles['chat-room-input-btn']}>
                    <Button onClick={submitData}>发送</Button>
                </div>
            </div>
        </div>
    );
};
export default ChatRoom;
