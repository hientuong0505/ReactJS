import React, {useState} from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {

    const {onSubmit} = (props);
    const [value,setValue] = useState('');

    //Bat su kien thay doi Input
    function handleValueChange(e) {
        console.log(e.target.value);
        //Lay input
        setValue(e.target.value);
    }

    //Ngan chan reload trang
    function handleOnSubmit(e) {
        e.preventDefault();

        if(!onSubmit) return;
        const formValues = {
            title:value,

        };
        onSubmit(formValues);

        //Reset form input
        setValue('');
    }

    return (
        <form onSubmit={handleOnSubmit} >
            <input 
                type="text" 
                value ={value}
                onChange={handleValueChange}    
                />
        </form>
    );
}

export default TodoForm;