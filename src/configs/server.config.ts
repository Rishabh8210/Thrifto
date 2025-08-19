export default () => ({
    app: {
        PORT: parseInt(process.env.PORT ?? '3000', 10),
    }
})