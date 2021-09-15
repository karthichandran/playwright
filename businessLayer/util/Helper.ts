export default class RandomHelper {

    Money = () => {
        let rndNumber = Math.floor(Math.random() * (199 - 10) + 10) + "." + Math.floor(Math.random() * (99 - 10) + 10);
        return rndNumber;
    }

    Number = (max: number, min: number) => {
        let rndNumber = Math.floor(Math.random() * (max - min) + min);
        return rndNumber;
    }

    TwoLetters = ():string => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        result += characters.charAt(Math.floor(Math.random() * charactersLength));

        return result.trim();
    }

    AddressOne = () => {
        let streets: string[] = [
            "Some St.", "Some Circle", "Some Court", "Some Parkway", "Some Blvd",
            "One St.", "One Circle", "One Court", "One Parkway", "One Blvd",
            "Two St.", "Two Circle", "Two Court", "Two Parkway", "Two Blvd"
        ];
        let rndNumber = Math.floor(Math.random() * ((streets.length - 1) - 1) + (streets.length - 1));
        let address = rndNumber + " " + streets[rndNumber];
        return address;
    }

    PhoneAreaCode = () => {
        let rndNumber = Math.floor(Math.random() * (999 - 201) + 999);
        return rndNumber;
    }

    PhoneNumber = () => {
        let rndNumber1 = Math.floor(Math.random() * (999 - 201) + 201);
        let rndNumber2 = Math.floor(Math.random() * (9999 - 1001) + 1001).toString();
        return rndNumber1 + rndNumber2;
    }

    RandomName = (): string => {
        let names: string[] = [
            "Zero", "One", "Two", "Three", "Four", "Five",
            "Six", "Seven", "Eight", "Nine", "Ten",
            "Eleven", "Twelve", "Thirteen", "Fourteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen", "Twenty"
        ];
        let max=names.length - 1;
        let rndNumber = Math.floor(Math.random() * (max - 1) + 1);
        let rndName = names[rndNumber];
        return rndName;
    }

    FirstName = () => {
        return this.RandomName();
    }

    LastName = () => {
        return this.RandomName();
    }

    CompanyName = () => {
        let firstName = this.RandomName();
        let lastName = this.RandomName();
        return "comp " + " " + firstName + " " + lastName;
    }

    CompanyCode = () => {
        let rndNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
        return rndNumber;
    }
}