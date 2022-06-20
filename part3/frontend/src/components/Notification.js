import React from "react"
import "./Notification.css"

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification