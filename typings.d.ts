declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
    export function ReactComponent(
        props: React.SVGProps<SVGSVGElement>,
    ): React.ReactElement;
    const url: string;
    export default url;
}

interface Window {
    APP_CONFIG: {
        API_HOST: string;
        GROUP: string;
    };
}

// 用户和部门的全局定义，业务定制的可以在此基础上extends
interface DepartmentTypes {
    // 主键
    id: number;
    // 父级别部门id
    parentId: number;
    // 部门全称
    fullName: string;
    // 部门简称
    name: string;
    // 部门简称拼音
    pinyin: string;
}

interface UserTypes {
    // tapper提供的员工id
    id: number;
    // 工号
    userId: string;
    // 姓名
    name: string;
    // 姓名拼音
    namePinyin: string;
    // 是否在职
    alive: boolean;
    // 是否超级管理员
    admin: boolean;
    // 职位
    post: string;
    // 钉钉头像url
    dingtalkAvatar: string;
    // 钉钉名称
    dingtalkName: string;
    // 工作邮箱
    workEmail: string;
    // 汇报对象
    reportUser: string;
    // 汇报对象的id
    reportUserId: number;
    // 所属部门
    departmentList: DepartmentTypes[];
}
