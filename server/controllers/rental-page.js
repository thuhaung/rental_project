
class rentalPageController {
    testRender(res, req, next) {
        req.send('This is rental-page');
    }
}

export default new rentalPageController();
