import {IContact} from "./types";
import {addContact, deleteContact, fetchAllContacts, updateContact} from "./api";
import * as storage from './storage';
import {saveContacts} from "./storage";

jest.mock('./storage');

function getDefaultContactsSorted(): IContact[] {
    const data: IContact[] = [
        {
            id: "111",
            name: "Doug",
            age: 50,
            email: "doug@gmail.com",
            phone: "902-731-4248",
        },
        {
            id: "222",
            name: "Mary",
            age: 40,
            email: "mary@gmail.com",
            phone: "306-866-1234",
        },
        {
            id: "333",
            name: "John ",
            age: 30,
            email: "john@gmail.com",
            phone: "813-999-9876",
        },
    ];
    return sortContactCollection(data);
}

function containsSameContacts(c1: IContact[], c2: IContact[]) {
    if(c1 === c2) return true;
    return JSON.stringify(sortContactCollection(c1)) === JSON.stringify(sortContactCollection(c2));
}

function sortContactCollection(collection: IContact[]): IContact[] {
    const compareById = (a: IContact, b: IContact) => a.id.localeCompare(b.id);
    return collection.sort(compareById);
}

describe("CRUD success", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        (storage.getContacts as jest.Mock).mockReturnValue(getDefaultContactsSorted());
    });

    it("read all", () => {
        const expected = getDefaultContactsSorted();
        const result = fetchAllContacts();
        expect(sortContactCollection(result)).toStrictEqual(expected);
    });

    it("add contact", () => {
        const newContact: IContact = {
            name: "new guy",
            id: "999",
            age: 99,
            phone: "306-555-1212"
        };
        const expected = getDefaultContactsSorted();
        expected.push(newContact);
        addContact(newContact);
        expect(storage.saveContacts).toHaveBeenCalledWith(expected);
    });

    it("update contact", () => {
        const expected = getDefaultContactsSorted();
        const updatedContact = expected[1];
        updatedContact.email = "new@gmail.com";
        const updateContactParam = JSON.parse(JSON.stringify(updatedContact));
        updateContact(updateContactParam);
        expect(storage.saveContacts).toHaveBeenCalledWith(expected);
    });

    it("delete contact", () => {
        const idToDelete = "222";
        const expected = getDefaultContactsSorted().filter(x => x.id !== idToDelete);
        (storage.saveContacts as jest.Mock).mockImplementation((data: IContact[]) => {
            expect(containsSameContacts(expected, data)).toBeTruthy();
        });
        deleteContact(idToDelete);
    });
});

describe("CRUD errors", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        (storage.getContacts as jest.Mock).mockReturnValue(getDefaultContactsSorted());
    });


    it("delete contact with incorrect ID", () => {
        const idToDelete = "999";
        expect(() => deleteContact(idToDelete)).toThrow();
    });

    it("update contact with incorrect ID", () => {
        const updateContactParam: IContact = {
            id: "999",
            name: "changed-name"
        };
        expect(() => updateContact(updateContactParam)).toThrow();
    });
});
