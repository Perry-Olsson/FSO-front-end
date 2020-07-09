const notify = (setNotification, notification) => {
    setNotification(notification)
    setTimeout(() => setNotification({message: null, type: "success"}), 10000)
}

export default notify;