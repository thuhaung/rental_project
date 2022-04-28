
class advertiseController {
    testRender(res, req, next) {
        req.send('This is advertise page');
    }
}

export default new advertiseController();

