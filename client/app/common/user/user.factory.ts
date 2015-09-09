let UserFactory = function(){
	const user = {
		isSignedIn: false
	};

	let getUser = ()=>{
		return user;
	};

	let isSignedIn = ()=>{
		return user.isSignedIn;
	};

	return { getUser, isSignedIn };
};

export default UserFactory;