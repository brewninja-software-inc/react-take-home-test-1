import {IContact} from "./types";
import {apiAddContact, apiDeleteContact, apiFetchAllContacts, apiUpdateContact} from "./api";
import * as storage from './storage';

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

beforeEach(() => {
    jest.resetAllMocks();
    (global.setTimeout as unknown) = jest.fn(cb => cb());
    (storage.getContacts as jest.Mock).mockReturnValue(getDefaultContactsSorted());
});

describe("CRUD success", () => {

    it("read all", async () => {
        const expected = getDefaultContactsSorted();
        const result = await apiFetchAllContacts();
        expect(sortContactCollection(result)).toStrictEqual(expected);
    });

    it("add contact", async () => {
        const newContact: IContact = {
            name: "new guy",
            id: "999",
            age: 99,
            phone: "306-555-1212"
        };
        const expected = getDefaultContactsSorted();
        expected.push(newContact);
        await apiAddContact(newContact);
        expect(storage.saveContacts).toHaveBeenCalledWith(expected);
    });

    it("update contact", async () => {
        const expected = getDefaultContactsSorted();
        const updatedContact = expected[1];
        updatedContact.email = "new@gmail.com";
        const updateContactParam = JSON.parse(JSON.stringify(updatedContact));
        await apiUpdateContact(updateContactParam);
        expect(storage.saveContacts).toHaveBeenCalledWith(expected);
    });

    it("delete contact", async () => {
        const idToDelete = "222";
        const expected = getDefaultContactsSorted().filter(x => x.id !== idToDelete);
        (storage.saveContacts as jest.Mock).mockImplementation((data: IContact[]) => {
            expect(containsSameContacts(expected, data)).toBeTruthy();
        });
        await apiDeleteContact(idToDelete);
    });
});

describe("CRUD errors", () => {

    it("delete contact with incorrect ID", async () => {
        const idToDelete = "999";
        await expect(() => apiDeleteContact(idToDelete)).rejects.toThrow();
    });

    it("update contact with incorrect ID",async () => {
        const updateContactParam: IContact = {
            id: "999",
            name: "changed-name"
        };
        await expect(async () => await apiUpdateContact(updateContactParam)).rejects.toThrow();
    });

    it("throw when adding a duplicate", async () => {
        const contactToAdd: IContact = {
            id: "999",
            name: getDefaultContactsSorted()[1].name
        };
        await expect(async () => await apiAddContact(contactToAdd)).rejects.toThrow(new Error('A contact with that name already exists'));
    });

    it("throw when updating a contact with a name that exists on another contact", async () => {
        const existingContacts = getDefaultContactsSorted();
        const contactToAdd: IContact = {
            id: existingContacts[0].id,
            name: existingContacts[1].name
        };
        await expect(async () => await apiAddContact(contactToAdd)).rejects.toThrow(new Error('A contact with that name already exists'));
    });
});
