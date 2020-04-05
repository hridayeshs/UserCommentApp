import React from 'react';

const Message = ({ message }) => (
	<div>
		<div className="alert alert-success" role="alert">
		<span className="glyphicon glyphicon-thumbs-up"></span>
		<span className="message">{message} Click here to <a href="/login">Login</a></span>
		</div>
</div>
);

export default Message;
