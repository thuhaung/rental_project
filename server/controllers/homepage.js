import User from "../models/user.js";

class homepageController {
    testRender(res, req, next) {
        req.send('<h1>This is homepage</h1>' 
        + '<a href="/rental">Rental-page</a></br>'
        + '<a href="/advertise">Advertise-page</a>');
    }
}

export default new homepageController();
