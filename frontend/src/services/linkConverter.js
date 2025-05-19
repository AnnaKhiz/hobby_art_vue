export function openMenuPage(link, value) {
	let path = {};
	if (link) {
		path = { name: link, hash: hash(value) };
	} else {
		const height = window.outerHeight * 100;
		window.scrollTo({  top: height, behavior: 'smooth' });
	}
	return path
}

function hash(value) {
	switch (value) {
		case 'sale':
			return '#popular';
		case 'new-products':
			return '#popular';
		case 'catalog':
			return '#catalog';
		case 'popular':
			return '#popular';
		default:
			return false;
	}
}
