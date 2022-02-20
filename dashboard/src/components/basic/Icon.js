import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default Icon = ({
    icon,
    size
}) => (
    <span>
        <FontAwesomeIcon icon={icon} size={size} />
    </span>
)