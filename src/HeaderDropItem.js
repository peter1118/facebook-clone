import React from 'react';
import "./HeaderDropItem.css";

function HeaderDropItem({txt, leftIcon, action}) {
return (
    <div className='headerDropItem' onClick={action}>
        <div className="header_drop_item_icon">
            {leftIcon}
        </div> 
        <p>{txt}</p>
    </div>
)
}

export default HeaderDropItem;
