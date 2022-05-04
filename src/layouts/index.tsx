import React from 'react';

import { ConfigProvider } from 'antd';

import { IRouteComponentProps } from 'umi';


import 'moment/locale/zh-cn';
import zh from 'antd/lib/locale/zh_CN';

import './styles.less';

export default function PageLayout(props: IRouteComponentProps) {
    const { children } = props;
    
    
    //
    

    return (
        <ConfigProvider locale={zh}>
            <div className={'page-layout'}>
                
                <div className={'page-layout-main'}>
                    <div className={'page-layout-content'}>{children}</div>
                </div>
                
            </div>
        </ConfigProvider>
    );
}
