const validateMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error)
        return res.status(400)
    }
}

export default validateMiddleware