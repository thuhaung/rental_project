import homepageRouter from './homepage.js';
import rentalPageRouter from './rental-page.js';
import userInfoRouter from "./user-info.js";
import advertisementPageRouter from './advertisement-page.js';


function Router(app) {
    app.use('/rental', rentalPageRouter);
    app.use('/', homepageRouter);
    app.use("/user", userInfoRouter);
    app.use("/advertisement", advertisementPageRouter);
}

export default Router;
