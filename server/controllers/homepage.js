import bcrypt from "bcrypt";

const users = [{
    name: "Ha",
    password: "123"
}]

export const getUser = (req, res) => {
    res.json(users);
}

export const postUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            name: req.body.name,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send("User added.")
    } catch(error) {
        res.send(error.message);
    }
    
}

export const login = async (req, res) => {
    const user = users.find(user => user.name == req.body.name);
    if (user == null) {
        return res.status(400).send("Cannot find user.");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).send("Logged in.");
        }
        else {
            return res.send("Incorrect password.");
        }
    } catch(error) {
        res.status(500).send();
    }


}




/*


app.get("/user", (req, res) => {
    
})

app.post("/user", (req, res) => {
    
})
*/