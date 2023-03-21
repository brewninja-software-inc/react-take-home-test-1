import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

import './CreateContactModal.css';

import { apiAddContact, IContact, apiUpdateContact } from "../../data/contacts";
import { generateUUID } from "../../util/guid";
import { getErrorMessage } from "../../util/functions";

interface ICreateContactModalProps {
  isVisible: boolean;
  fetchContactsData: () => Promise<void>;
  setShowCreateContactModal: (show: boolean) => void;
  setError: (error: string) => void;
  contactToEdit: IContact | null;
}

const contactInfoInitial = { id: '', name: '' };

export const CreateContactModal = ({
                                     isVisible,
                                     fetchContactsData,
                                     setShowCreateContactModal,
                                     setError,
                                     contactToEdit,
                                   }: ICreateContactModalProps) => {
  const [contactInfo, setContactInfo] = useState<IContact>(contactInfoInitial);
  const [isFormValidated, setIsFormValidated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (contactToEdit) {
      setContactInfo(contactToEdit);
    }
  }, [contactToEdit])

  const closeCreateContactModal = () => {
    setShowCreateContactModal(false);
    setIsFormValidated(false);
    setContactInfo(contactInfoInitial);
  }

  const createContact = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setIsFormValidated(true);
      return;
    }

    try {
      setIsLoading(true);
      if (!!contactToEdit) {
        await apiUpdateContact(contactInfo);
      } else if (contactInfo) {
        await apiAddContact({ ...contactInfo, id: generateUUID() })
      }
      await fetchContactsData();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      closeCreateContactModal();
    }
  };

  const onChangeContactInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [event.target.id]: event.target.value })
  };

  return (
    <Modal show={ isVisible } onHide={ closeCreateContactModal } data-testid="create-modal">
      <Modal.Header closeButton>
        <Modal.Title>{ !!contactToEdit ? <>Update contact</> : <>Create new contact</> }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={ isFormValidated } onSubmit={ createContact }>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={ contactInfo.name }
              onChange={ onChangeContactInfo }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              value={ contactInfo.phone }
              onChange={ onChangeContactInfo }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              value={ contactInfo.age }
              onChange={ onChangeContactInfo }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={ contactInfo.email }
              onChange={ onChangeContactInfo }
            />
          </Form.Group>

          <Button className="closeButton" variant="secondary" onClick={ closeCreateContactModal }>Close</Button>
          <Button variant="primary" type="submit">
            {
              isLoading &&
							<Spinner
								animation="border"
								size="sm"
							/>
            }
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
