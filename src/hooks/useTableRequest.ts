import { useCallback, useRef } from 'react';

import useRequest, { ServiceType, OptionType } from './useRequest';

const defaultPageConfig = {
    pageIndex: 1,
    pageSize: 10,
};

/**
 * 基于useRequest改造针对Table的请求hooks，主要集成了页码pagination的逻辑
* */

export default function useTableRequest<T = any>(
    service: ServiceType,
    option?: Partial<OptionType>,
) {
    const paramsRef = useRef<any>(defaultPageConfig);
    const { defaultParams = [] } = option || {};

    const { run, ...rst } = useRequest<T>(service, {
        ...option,
        defaultParams: [
            {
                ...paramsRef.current,
                ...(defaultParams[0] || {}),
            },
        ],
    });

    const {
        response: { pageIndex, pageSize, total },
    } = rst;

    const tableRun = useCallback(async (arg = {}) => {
        const params = {
            pageIndex: 1,
            pageSize: 10,
            ...arg,
        };

        paramsRef.current = params;

        run(params);
    }, []);

    const onPageChange = useCallback((index: number, size: number) => {
        paramsRef.current = {
            ...paramsRef.current,
            pageIndex: index,
            pageSize: size,
        };

        run(paramsRef.current);
    }, []);

    return {
        ...rst,
        run: tableRun,
        pagination: {
            current: pageIndex,
            pageSize,
            total,
            onChange: onPageChange,
        },
    };
}
