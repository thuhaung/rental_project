import homepageRouter from './homepage.js';
import rentalPageRouter from './rental-page.js';
import userInfoRouter from "./user-info.js";


function Router(app) {
    app.use('/rental', rentalPageRouter);
    app.use('/', homepageRouter);
    app.use("/user", userInfoRouter);
}

export default Router;
