
import { useSelector, useDispatch } from "react-redux";
import GetContactForm from "components/GetContactForm/GetContactForm";
import ContactList from "components/ContactList/ContactList";
import FilterContact from "components/FilterContact/FilterContact";
import 'react-toastify/dist/ReactToastify.css';
import { addContact, deleteContact } from "redux/contacts/contact-slice";
import { setFilter } from "redux/filter/filter-slice";
import { getAllContacts, getFilteredContacts } from "redux/contacts/contacts-selector";
import { getFilter } from "redux/filter/filter-selector";
import styles from "components/app.module.css";
import { ToastContainer, toast } from 'react-toastify';
const Phonebook = () => {

    const filteredContacts = useSelector(getFilteredContacts);
    const allcontacts = useSelector(getAllContacts);
    const filter = useSelector(getFilter);

    const dispatch = useDispatch();
  

    const isDublicate = (name, number) => {
        const normalizedName = name.toLowerCase().trim();
        const normalizedNumber = number.toString().trim();
        const result = allcontacts.find(({ name, number}) => {
            return (name.toLowerCase() === normalizedName || number === normalizedNumber);
        })
        return Boolean(result)
    }

    const HandleAddContact = ({ name, number }) => {
        if (isDublicate(name, number)) {
            toast.info('The contact already exists, please add a new contact', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return false;
        }
        dispatch(addContact({ name, number }));
    }

    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    }
    const handleFilter = ({ target }) => {
        dispatch(setFilter(target.value))
    }


  
    const isContacts = Boolean(filteredContacts.length)

    return (
            <div className={styles.containerPhonebook}>
                 <h1 className={styles.titlePhone}>Phonebook</h1>
                <div>
                    <div>
                        <GetContactForm onSubmit={HandleAddContact} />
                    </div>
                    <div>
                        <h2 className={styles.titleContact}>Contacts</h2>
                    <FilterContact value={filter} handleChange={handleFilter} />
                        {isContacts && <ContactList removeContact={handleDeleteContact} items={filteredContacts} />}
                    {!isContacts && <p className={styles.addCont}>No any contact! Add new</p>}
                    <ToastContainer/>
                    </div>
                </div>
            </div>
        )
}



export default Phonebook;