import {IContact} from "./types";
import {getContacts, saveContacts} from "./storage";


export function fetchAllContacts(): IContact[] {
    return getContacts();
}

export function addContact(contact: IContact): void {
    const contacts = getContacts();
    contacts.push(contact);
    saveContacts(contacts);
}

export function deleteContact(id: string): void {
    const contacts = getContacts();
    const index = contacts.findIndex(x => x.id === id);
    if(index < 0) {
        throw new Error(`Could not find Contact to delete with id=${id}`);
    }
    contacts.splice(index, 1);
    saveContacts(contacts);
}

export function updateContact(contact: IContact): void {
    const contacts = getContacts();
    const index = contacts.findIndex(x => x.id === contact.id);
    if(index < 0) {
        throw new Error(`Could not find Contact to update with id=${contact.id}`);
    }
    contacts[index] = contact;
    saveContacts(contacts);
}
