let courses=[];

const studentId=1;

async function loadCourses(){

courses=await getCourses();

renderCourses(courses);

}

function renderCourses(list){

const container=document.getElementById("courseList");

container.innerHTML=list.map(c=>`

<div class="course-card">

<h3>${c.courseName}</h3>

<p><b>Credits:</b> ${c.credits}</p>

<p><b>Department:</b> ${c.departmentId}</p>

<button onclick="enroll(${c.courseId})">

Enroll

</button>

</div>

`).join("");

}

function searchCourses(){

const keyword=document.getElementById("searchBox").value.toLowerCase();

const filtered=courses.filter(c=>c.courseName.toLowerCase().includes(keyword));

renderCourses(filtered);

}
// ES6 async feature
async function enroll(courseId){

const msg=await enrollStudent(studentId,courseId);

alert(msg);

}

loadCourses();