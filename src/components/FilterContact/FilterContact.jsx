import PropTypes from 'prop-types';
import styles from "../FilterContact/filterContact.module.css";

const FilterContact = ({ handleChange, value}) => {
  return (
    <label className={styles.labelFilter}>
      Find contacts by name{' '}
      <input className={styles.inputFilter} value={value} name="filter" onChange={handleChange} placeholder="Filter contacts"/>
    </label>
  );
};

export default FilterContact;

FilterContact.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

