import Contact from '../Models/contact.model.js';

const create = async (req, res) => { 
    const contact = new Contact(req.body)
    try {
        await contact.save()
        return res.status(200).json({
            message: "Successfully saved the contact!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default { create, list }