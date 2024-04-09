const allSubjectsDetailContainer = document.querySelector("#attendanceGraph").children;

const subjectsArray = [];

for (let subject = 2; subject < allSubjectsDetailContainer.length;) {
	subjectsArray.push(allSubjectsDetailContainer[subject]);
	subject += 2;
}

const deliveredDetails = {};
const attendedDetails = {};
const medicalLeaveDetails = {};
const dutyLeaveDetails = {};


for (let i = 0; i < subjectsArray.length; i++) {
	let delivered = parseInt(subjectsArray[i].children[2].children[0].children[1].children[0].innerText);
	deliveredDetails[`${i}`] = delivered;
	let attended = parseInt(subjectsArray[i].children[2].children[0].children[2].children[0].innerText);
	attendedDetails[`${i}`] = attended;
	let medicalLeave = parseInt(subjectsArray[i].children[2].children[0].children[3].children[0].innerText);
	medicalLeaveDetails[`${i}`] = medicalLeave;
	let dutyLeave = parseInt(subjectsArray[i].children[2].children[0].children[4].children[0].innerText);
	dutyLeaveDetails[`${i}`] = dutyLeave;
}

const totalAttandance = {};

for (let i = 0; i < subjectsArray.length; i++) {
	totalAttandance[`${i}`] = attendedDetails[i] + medicalLeaveDetails[i] + dutyLeaveDetails[i];
}

var toggleRowBg = true;
function findBunkOrToAttend(targetPercentage, toggleRowBg) {
	for (let i = 0; i < subjectsArray.length; i++) {
		let isAboveTarget = false;
		let attPercentage = (totalAttandance[i] / deliveredDetails[i]) * 100;
		if (attPercentage >= targetPercentage) {
			isAboveTarget = true;
		}
		let rightDivList = subjectsArray[i].children[2].children[0];

		if (isAboveTarget) {
			let bunkClassNumber = 0;
			let attPerCopy = attPercentage;
			let attendedCopy = totalAttandance[i];
			let deliveredCopy = deliveredDetails[i];
			while (attPerCopy >= targetPercentage) {
				bunkClassNumber++;
				deliveredCopy++;
				attPerCopy = (attendedCopy / deliveredCopy) * 100;
			}

			//when the attandance is above target the loop runs one extra time
			//causing the bunkClass count and delivered to increase by one
			//resulting in attandance getting lower than target
			//so we reduce bunkClass count by 1
			//and delivered class count by 1
			//and recalculate attandance percentage
			bunkClassNumber--;
			deliveredCopy--;
			attPerCopy = (attendedCopy / deliveredCopy) * 100;

			let newListItem = document.createElement('li');
			newListItem.style.fontSize = '12px';
			if (toggleRowBg) {
				newListItem.classList.add('trow1');

			} else {
				newListItem.classList.add('trow0');

			}
			newListItem.innerText = `Maximum classes you can bunk: (Target Attandance- ${targetPercentage}%) : `;
			let newSpan = document.createElement('span');
			newSpan.style.color = 'limegreen';
			newSpan.innerText = `${bunkClassNumber}`;
			newListItem.append(newSpan);
			rightDivList.appendChild(newListItem);
		} else {
			let classesToAttendNumber = 0;
			let attPerCopy = attPercentage;
			let attendedCopy = totalAttandance[i];
			let deliveredCopy = deliveredDetails[i];
			while (attPerCopy < targetPercentage) {
				attendedCopy++;
				classesToAttendNumber++;
				deliveredCopy++;
				attPerCopy = (attendedCopy / deliveredCopy) * 100;
			}

			let newListItem = document.createElement('li');
			newListItem.style.fontSize = '12px';
			if (toggleRowBg) {
				newListItem.classList.add('trow1');

			} else {
				newListItem.classList.add('trow0');

			}
			newListItem.innerText = `Number of classes to reach ${targetPercentage}%: `;
			let newSpan = document.createElement('span');
			newSpan.style.color = 'red';
			newSpan.innerText = `${classesToAttendNumber}`;
			newListItem.append(newSpan);
			rightDivList.appendChild(newListItem);
		}
	}
}

findBunkOrToAttend(90, toggleRowBg);
toggleRowBg = !toggleRowBg;
findBunkOrToAttend(75, toggleRowBg);
toggleRowBg = !toggleRowBg;
findBunkOrToAttend(65, toggleRowBg);
toggleRowBg = !toggleRowBg;
findBunkOrToAttend(50, toggleRowBg);



