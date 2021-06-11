import React, { useState,useRef } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFilterForm.defaultProps = {
    onSubmit: null,
}

function PostFilterForm(props) {

    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {

        const TempValue = e.target.value
        setSearchTerm(TempValue);

        if(!onSubmit) return;


        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {

            const formValues = {
                searchTerm: TempValue,
            };
            onSubmit(formValues);

        },800);
    }

    return (
        <form>
            <input
                value={searchTerm}
                type="text"
                onChange={handleSearchTermChange}
            />  
        </form>
    );
}

export default PostFilterForm;