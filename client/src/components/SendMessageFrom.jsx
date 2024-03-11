
const SendMessageForm = ({ message, setMessage, handleSubmit, buttonDisabled, selectedFriend }) => {

    return (
        <>
            {
                selectedFriend ? <div className="container-button-send">
                <input
                    className="input-send"
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button
                    className={`button-send ${buttonDisabled ? 'button-send-disabled' : ''}`}
                    type="submit"
                    disabled={buttonDisabled}
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
            :
            ''
            }
        </>
    );
};

export default SendMessageForm;
