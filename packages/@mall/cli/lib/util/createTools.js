exports.getPromptModules = () => {
    return [
        'mallVersion',
        'typescript',
        'pwa',
        'mobx',
        'cssPreprocessors',
        'linter',
        'unit',
        'e2e'
    ].map(file => require(`../promptModule/${file}`))
}