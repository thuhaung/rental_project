
import homepageRoute from './homepage.js';
import rentalRoute from './rental-page.js';
import advertiseRoute from './advertise-page.js';

function route(app) {
    app.use('/rental', rentalRoute);
    app.use('/advertise', advertiseRoute);
    app.use('/', homepageRoute);
}

export default route;
