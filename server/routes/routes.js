import homepageRouter from './homepage.js';
import rentalPageRouter from './rental-page.js';
import userInfoRouter from "./user-info.js";
import advertisementPageRouter from './advertisement-page.js';
import chatroomRouter from './chatroom.js';


function Router(app) {
    app.use('/rental', rentalPageRouter);
    app.use("/user", userInfoRouter);
    app.use("/advertisement", advertisementPageRouter);
    app.use('/chatroom', chatroomRouter);
    app.use('/', homepageRouter);
}

export default Router;
