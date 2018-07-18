
async function fetchJSON(url) {
	const result = await fetch(url);
	return result.json();
}

function appendListToElement(list, elementId) {
	const element = document.getElementById(elementId);
	// Clear out what's there
	let last;
	// eslint-disable-next-line no-cond-assign
	while (last = element.lastChild) {
		element.removeChild(last);
	}
	// Build new children
	const frag = document.createDocumentFragment();
	list.forEach(item => {
		let el = document.createElement("li");
		el.innerText = `${item.first_name} ${item.last_name}`;
		frag.appendChild(el);
	});
	element.appendChild(frag);
}

window.showNewPersonArea = () => {
	document.getElementById("new-person").style.visibility = "visible";
};

function hideNewPersonArea() {
	document.getElementById("new-person").style.visibility = "hidden";
}

window.saveNewPerson = () => {
	const first_name = document.getElementById("first_name").value;
	const last_name = document.getElementById("last_name").value;
	ajax("/api/v1/people", {
		first_name,
		last_name,
	}).then(() => {
		hideNewPersonArea();
		return refreshPeopleList();
	}).catch(err => {
		alert(err.message);
	});
};

/**
 * @param {String} url
 * @param {Object} data
 * @returns {Promise}
 */
async function ajax(url, data) {
	return new Promise((resolve, reject) => {
		let x = new XMLHttpRequest();
		try {
			x.open(data ? "POST" : "GET", url, 1);
			x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			x.setRequestHeader("Content-type", "application/json");
			x.onreadystatechange = () => {
				x.readyState > 3 && resolve(x.responseJSON || x.responseText, x);
			};
			x.send(JSON.stringify(data));
		} catch (e) {
			reject(e);
		}
	});
}

async function refreshPeopleList() {
	const people = await fetchJSON("/api/v1/people");
	appendListToElement(people, "people-list");
}

(async () => {
	refreshPeopleList();
})();