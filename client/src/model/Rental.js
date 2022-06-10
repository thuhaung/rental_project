export class RentalGeneral {
    constructor(
        user,
        property_type,
        num_of_bedrooms,
        num_of_bathrooms,
        amenities,
        rent,
        deposit,
        water,
        electricity,
        address
    ){

        this.user = user;
        this.property_type = property_type;
        this.num_of_bedrooms = num_of_bedrooms;
        this.num_of_bathrooms = num_of_bathrooms;
        this.amenities = amenities;
        this.rent = rent;
        this.deposit = deposit;
        this.water = water
        this.electricity = electricity;
        this.address = address
    }

}

export class RentalImage{
    constructor(rentalImage){
        this.rentalImage = rentalImage
    }
}