import { useEffect, useMemo, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import './MainPage.css';

import { CreateContactModal } from "../create-contact-modal/CreateContactModal";
import { DeleteContactConfirmModal } from "../delete-contact-confirm-modal/DeleteContactConfirmModal";
import { apiFetchAllContacts, IContact } from "../../data/contacts";
import { contactsSortByNameFunction, getErrorMessage } from '../../util/functions';

export const MainPage = () => {
	const [contacts, setContacts] = useState<IContact[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [showCreateContactModal, setShowCreateContactModal] = useState<boolean>(false);
	const [showDeleteContactModal, setShowDeleteContactModal] = useState<boolean>(false);
	const [contactIdToDelete, setContactIdToDelete] = useState<string>('');
	const [contactToEdit, setContactToEdit] = useState<IContact | null>(null);

	const fetchContactsData = async () => {
		try {
			const contactsData = await apiFetchAllContacts();
			setContacts(contactsData)
		} catch (error) {
			setError(getErrorMessage(error));
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await fetchContactsData();
		})()
	}, []);

	const openDeleteContactModal = (contactId: string) => {
		setContactIdToDelete(contactId);
		setShowDeleteContactModal(true);
	}

	const closeDeleteContactModal = () => {
		setContactIdToDelete('');
		setShowDeleteContactModal(false);
	}

	const renderContacts = useMemo(() => {
		if(contacts.length) {
			const sortedContacts = contacts.sort(contactsSortByNameFunction)
			return sortedContacts.map((contact) => (
				<tr key={contact.id}>
					<td>{contact.name}</td>
					<td>{contact.phone}</td>
					<td>{contact.email}</td>
					<td>{contact.age}</td>
					<td>
						<Button variant="secondary" onClick={() => {
							setShowCreateContactModal(true);
							setContactToEdit(contact);
						}}>
							Edit
						</Button>
					</td>
					<td>
						<Button variant="secondary" onClick={() => openDeleteContactModal(contact.id)}>
							Delete
						</Button>
					</td>
				</tr>
			))
		}
		return null;
	}, [contacts])

	if(error) {
		return <div className='error'>{error}. Please refresh the page</div>
	}

	if(isLoading && !contacts.length) {
		return <div className='loadingSpinner'><Spinner/></div>
	}

	return (
		<div className='wrapper'>
			<h1 className='header'>Brew Ninja Test App</h1>
			<Button className='addContactButton' variant="outline-primary" onClick={() => setShowCreateContactModal(true)}>Create New</Button>

			<Table striped bordered hover>
				<thead>
				<tr>
					<th>Name</th>
					<th>Phone number</th>
					<th>Email</th>
					<th>Age</th>
					<th/>
					<th/>
				</tr>
				</thead>
				<tbody>
				{renderContacts}
				</tbody>
			</Table>

			<CreateContactModal
				isVisible={showCreateContactModal}
				fetchContactsData={fetchContactsData}
				setShowCreateContactModal={setShowCreateContactModal}
				setError={setError}
				contactToEdit={contactToEdit}
			/>

			<DeleteContactConfirmModal
				isVisible={showDeleteContactModal}
				onHide={closeDeleteContactModal}
				contactId={contactIdToDelete}
				fetchContactsData={fetchContactsData}
				setError={setError}
			/>
		</div>
	)
};
