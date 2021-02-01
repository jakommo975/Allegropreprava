import React from 'react';
import './BaseModal.css';

const BaseModal = (props) => {
    const classes = ["Modal", props.class && props.class]
    return (
        <React.Fragment>
            {props.isOpen &&
                <div className="ModalOverlay">
                    <div className={classes.join(' ')}>
                        {props.children}
                    </div>
                </div>
            }

        </React.Fragment>
    );
}

export default BaseModal;