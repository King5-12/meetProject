/*
 * 使用commintlint校验git提交信息规范
 * 规范基于: https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/
 *
 * 示例格式：
 *
 * <type>[optional scope]: <subject>
 * // 空一行
 * [optional body]
 * // 空一行
 * <footer> // 必须带上jira号作为开头
 *
 * */

// 详细规则配置见：https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
module.exports = {
    // 继承自：https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
        // 'signed-off-by': [2, 'always', 'SCS-'], // 这里利用签名信息来规定必须带有jira号
    },
};
