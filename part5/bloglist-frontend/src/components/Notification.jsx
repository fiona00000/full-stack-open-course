const Notification = ({message}) => {
  return (
      <>
        {
          message.message &&
              <div className={message.type}>
                  {message.message}
              </div>
        }
      </>
  )
}

export default Notification