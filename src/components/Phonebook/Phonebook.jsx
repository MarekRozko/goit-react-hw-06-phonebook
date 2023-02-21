import { useState , useEffect} from "react";
import { nanoid } from 'nanoid';
import GetContactForm from "components/GetContactForm/GetContactForm";
import ContactList from "components/ContactList/ContactList";
import FilterContact from "components/FilterContact/FilterContact";
import styles from "components/app.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Phonebook = () => {
    const [contacts, setContacts] = useState(() => {
        const contacts = JSON.parse(localStorage.getItem("contact"));
        return contacts ? contacts : [];
    })
    const [filter, setFilter] = useState("");
    useEffect(() => {
        localStorage.setItem("contact", JSON.stringify(contacts));
    }, [contacts]);

    const isDublicate = (name, number) => {
        const normalizedName = name.toLowerCase().trim();
        const normalizedNumber = number.toString().trim();
        const result = contacts.find(({ name, number}) => {
            return (name.toLowerCase() === normalizedName || number === normalizedNumber);
        })
        return Boolean(result)
    }

    const addContact = ({ name, number }) => {
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

        setContacts(prevContacts => {
            const newContact = {
                id: nanoid(),
                name,
                number,
            }
            return [newContact, ...prevContacts]
        })
        return true;
    }

    const removeContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(item => item.id !== id))
    }
    const handleFilter = ({ target }) => setFilter(target.value);

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        }
        const normalizedFilter = filter.toLowerCase();
        const result = contacts.filter(({ name, number}) => {
            return (name.toLowerCase().includes(normalizedFilter) || number.toLowerCase().includes(normalizedFilter))
        })
        return result;
    }

    const filteredContacts = getFilteredContacts();
    const isContacts = Boolean(filteredContacts.length)

    return (
            <div className={styles.containerPhonebook}>
                 <h1 className={styles.titlePhone}>Phonebook</h1>
                <div>
                    <div>
                        <GetContactForm onSubmit={addContact} />
                    </div>
                    <div>
                        <h2 className={styles.titleContact}>Contacts</h2>
                        <FilterContact handleChange={handleFilter} />
                        {isContacts && <ContactList removeContact={removeContact} contacts={filteredContacts} />}
                    {!isContacts && <p className={styles.addCont}>No any contact! Add new</p>}
                    <ToastContainer/>
                    </div>
                </div>
            </div>
        )
}



export default Phonebook;