const Notification = ({ message, success }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 18,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 5,
        marginBottom: 15
    }
    const failureStyle = { ...successStyle, color: 'red' }
    const chosenStyle = success ? successStyle : failureStyle

    if (message === '') {
        return null
    }

    return (
        <div className="error" style={chosenStyle}>
            {message}
        </div>
    )
}

export default Notification
