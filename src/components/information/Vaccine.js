import React from 'react';
import ReactModal from "react-modal";

/**
 * Vaccine Component
 *
 * @component
 * @namespace Vaccine
 * @param {Object} props - The component accepts selectedVaccine and italizeScientificNames as props.
 * @param {Object} props.selectedVaccine - The selected vaccine object containing details such as name, description, link, and lastUpdated.
 * @param {string} props.selectedVaccine.name - The name of the selected vaccine.
 * @param {string} props.selectedVaccine.description - The description of the selected vaccine.
 * @param {string} props.selectedVaccine.link - The URL link to learn more about the selected vaccine.
 * @param {string} props.selectedVaccine.lastUpdated - The last updated date for the selected vaccine.
 * @param {Function} props.convertCamelCaseToReadable - Function that converts camel case strings to a readable format.
 * @returns {JSX.Element} The Vaccine Information component.
 *
 * @example
 * // Render the Vaccine component with a sample vaccine and italizeScientificNames function
 * <Vaccine 
 *   selectedVaccine={{ 
 *     name: 'Vaccine X', 
 *     description: 'A description of Vaccine X with scientific names.', 
 *     link: 'https://example.com/vaccine-x', 
 *     lastUpdated: '2024-07-29' 
 *   }} 
 *   convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}
 * />
 */

const Vaccine = ({ 
    selectedVaccine, 
    convertCamelCaseToReadable 
}) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    /**
     * This function determines sets the modal Open
     * 
     * @function
     * @name openModal
     * 
     * @returns {void} This function does not return a value. It updates the `isOpen` state directly.
     */
    
    function openModal() {
        setModalIsOpen(true);
    }

    /**
     * This function determines sets the modal Close
     * 
     * @function
     * @name openModal
     * 
     * @returns {void} This function does not return a value. It updates the `isOpen` state directly.
     */

    function closeModal() {
        setModalIsOpen(false);
    }

    /**
     * Formats the given content by:
     * 1. Splitting it at `<br />` or `<br>` tags and inserting React line break elements (`<br />`).
     * 2. Replacing any single apostrophes `'` with double inverted commas `"` in the content.
     * 
     * This function takes a string with `<br />` or `<br>` tags and returns an array of React elements. The string is split at each `<br />` tag, and a line break is inserted between each part, except after the last part. It also replaces single apostrophes with double inverted commas.
     * 
     * @function
     * @param {string} content - The string containing text, `<br />` or `<br>` tags, and possibly single apostrophes.
     * @returns {React.ReactNode[]} An array of React elements where each element represents a part of the original string. Line breaks are inserted between parts based on the original `<br />` tags, and apostrophes are replaced with double quotes.
     * 
     * @example
     * // Example usage
     * const content = "Monovalent live-attuned <br/>(CHIKV-LR2006-OPY1; deleted nsPr3 (replicase complex))";
     * const formatContent = formatContent(content);
     * 
     * // formatContent will be an array of React elements with line breaks appropriately inserted and single apostrophes replaced.
     */
    const formatContent = content => {
        const updatedContent = content.replace(/'/g, '"');
        return updatedContent.split(/<br\s*\/?>/gi).map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < updatedContent.split(/<br\s*\/?>/gi).length - 1 && <br />}
            </React.Fragment>
        ));
    };

    /**
     * Formats the given content by:
     * 1. Splitting it at `<br />` or `<br>` tags and inserting React line break elements (`<br />`).
     * 2. Replacing any single apostrophes `'` with double inverted commas `"` in the content.
     * 
     * This function takes a string with `<br />` or `<br>` tags and returns an array of React elements. The string is split at each `<br />` tag, and a line break is inserted between each part, except after the last part. It also replaces single apostrophes with double inverted commas.
     * 
     * @function
     * @param {string} content - The string containing text, `<br />` or `<br>` tags, and possibly single apostrophes.
     * @returns {React.ReactNode[]} An array of React elements where each element represents a part of the original string. Line breaks are inserted between parts based on the original `<br />` tags, and apostrophes are replaced with double quotes.
     * 
     * @example
     * // Example usage
     * const content = "Monovalent live-attuned <br/>(CHIKV-LR2006-OPY1; deleted nsPr3 (replicase complex))";
     * const formatHeading = formatHeading(content);
     * 
     * // formatHeading will be an array of React elements with line breaks appropriately inserted and single apostrophes replaced.
     */

    const formatHeading = content => {
        const updatedContent = content.replace(/'/g, '"');
        return updatedContent.split(/<br\s*\/?>/gi).map((part, index) => (
            <span key={index} className={`${index===1 ? `text-hover` : ``}`}>
                {part}
                {index < updatedContent.split(/<br\s*\/?>/gi).length - 1 && <br />}
            </span>
        ));
    };

    return <div className='position-relative slide-left'>
                <h1 className='heading text-primary text-center'>{selectedVaccine.name}
                    {/* {selectedVaccine.packageInsertLink && <i class="fa-regular fa-file-pdf text-warning hover-cursor hover-underline ms-2" onClick={()=>window.open(selectedVaccine.packageInsertLink, '_blank')}></i>} */}
                    {selectedVaccine.productProfile && <i class="fa-regular fa-folder-open text-warning hover-cursor ms-2" onClick={openModal}></i>}
                </h1>
                {/* <p className='mb-3'>{italizeScientificNames(selectedVaccine.description)}</p> */}
                {selectedVaccine.licensingDates && (
                    <table className='table table-light table-striped w-100 m-0'>
                        <thead>
                            <tr>
                                <th>Licenser</th>
                                <th>Indication</th>
                                <th>Date of Approval</th>
                                <th>Number of Doses Given</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedVaccine.licensingDates.map((licensingDate, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td><a href={licensingDate.source} className='selectable' target="_blank" rel="noopener noreferrer">{licensingDate.name}</a></td>
                                    <td>{licensingDate.type ? licensingDate.type : '-'}</td>
                                    <td>
                                        <a 
                                        href={licensingDate.source} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        >
                                        {licensingDate.date}
                                        </a>
                                    </td>
                                    <td>?</td>
                                </tr>
                            </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
                {selectedVaccine.introduction && (
            <table className='table table-striped w-100 m-0 mb-2'>
                <tbody>
                    {Object.entries(selectedVaccine.introduction).map(([category, details], index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td colSpan={2} className='text-center fw-bold'>{category}</td>
                            </tr>
                            {Object.entries(details).map(([key, value], idx) => (
                                <tr key={idx}>
                                    <td className=''>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        )}
        <p className='mb-0'><a className='read-more hover-cursor hover-underline' target="_blank" rel="noopener noreferrer" href={`${selectedVaccine.link}`}>Learn more...</a></p>
        <span className='last-updated text-muted position-absolute end-0 bottom-0'>Last updated: {selectedVaccine.lastUpdated}</span>
        {selectedVaccine.productProfile && <ReactModal isOpen={modalIsOpen} closeTimeoutMS={200} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
            <i class="fa-solid fa-xmark fa-lg modal-close-btn position-absolute end-0 hover-cursor" onClick={closeModal}></i>
            <h1 className="heading text-black pt-2 text-center">{formatHeading(selectedVaccine.productProfile.name)}</h1>
            <table className='table table-light w-100 m-0'>
                <tbody>
                    {Object.entries(selectedVaccine.productProfile).map(([key, value], index) => {
                        if (key==="name") return null;
                        return (
                            <tr key={index}>
                                <td className={`align-middle ${key==="composition"?`text-white bg-black`:``}`}>{key==="composition" ? `Composition/Platform`: key==="coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                <td className={`align-middle ${key==="composition"?`text-white bg-black`:``}`}>{formatContent(value)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </ReactModal>}
    </div> 
}

export default Vaccine;