import { Storage } from "@google-cloud/storage";

const cloudStorage = new Storage({
    keyFilename: "rentalproject-351520-dc2d47f63fad.json",
    projectId: "rentalproject-351520"
});

const bucket = cloudStorage.bucket("rental-project");

export default bucket;