import React, {ReactElement, useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import {apiAddContact, apiDeleteContact, apiFetchAllContacts, apiUpdateContact, IContact} from "./data/contacts";
import { generateUUID } from "./util/guid";
import "../src/styles.css";


const App: React.FC = (): ReactElement => {

    const[contacts, setContacts] = useState<IContact[]>([]);
    const[newContact, setNewContact] = useState<IContact>({id:'', name:'', phone:'', age:0, email:''})

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async(): Promise<void> => {
        try{
            const contactList = await apiFetchAllContacts();
            setContacts(contactList);
        } catch (error){
            console.error('Error fetching contacts', error);
        }
    };

    const addContact = async(): Promise<void> =>{
        try{
            newContact.id = generateUUID();
            const newAddedContact = await apiAddContact(newContact);
            setContacts([...contacts, newContact]);
            setNewContact({id: '', name: '', age: 0, phone: '', email: ''});
            return newAddedContact;
        } catch(error){
            console.error('Error adding contact', error);
        }
    }

    const editContact = async(updateContact: IContact): Promise<void> => {
        try{
            const result = await apiUpdateContact(updateContact);
            getContacts();
        } catch(error){
            console.error('Error updating contact', error);
        }
    } 
    
    const deleteContact = async(id:string): Promise<void> =>{
        try{
            const deletedContact = await apiDeleteContact(id);
            getContacts();
        } catch(error){
            console.error('Error deleting contact', error);
        }
    }

    return(
        <Container>
            <Row>
                <Col><h1 className='text-center'>Contact Manager</h1></Col>
            </Row>
            <Row>
               <Form>
                    <Form.Group controlId="name">
                        <Form.Control 
                            type="text"
                            placeholder="Name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="age">
                        <Form.Control 
                            type="number"
                            placeholder="Age"
                            value={newContact.age}
                            onChange={(e) => setNewContact({...newContact, age: parseInt(e.target.value)})}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control 
                            type="email"
                            placeholder="Email"
                            value={newContact.email}
                            onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={addContact}>
                        Add Contact
                    </Button>
               </Form>
               <Table responsive="sm" striped bordered hover >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Age</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>
                                <Form.Control 
                                type="text"
                                value={contact.name}
                                placeholder="Name"
                                />
                            </td>
                            <td>
                                <Form.Control 
                                type="text"
                                value={contact.phone}
                                placeholder="Phone"
                                />
                            </td>
                            <td>
                                <Form.Control 
                                type="number"
                                value={contact.age || 0}
                                placeholder="Age"
                                />
                            </td>
                            <td>
                                <Form.Control 
                                type="email"
                                value={contact.email}
                                placeholder="Email"
                                />
                            </td>
                        </tr>
                        ))}
                    </tbody>
               </Table>
            </Row>
        </Container>
)};

export default App;