
import homepageRouter from './homepage.js';
import rentalPageRouter from './rental-page.js';


function Router(app) {
    app.use('/rental', rentalPageRouter)
    app.use('/', homepageRouter)
}

export default Router;
