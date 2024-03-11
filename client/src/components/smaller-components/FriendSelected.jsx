
const FriendSelected = ({selectedFriend}) => {
    return (
        <>
            <img className='img-icon' style={{ borderRadius: '50%', width: '30px', height: '30px' }} src={`http://localhost:8080/${selectedFriend?.imgPath}`} alt="" />
            <p className="name">{selectedFriend?.name}</p>
        </>
    )
}

export default FriendSelected