const studentId=1;

async function loadEnrollments(){

const enrollments=await getEnrollments();

const container=document.getElementById("enrollmentList");

const list=enrollments.filter(e=>e.studentId==studentId && e.dropDate==null);

container.innerHTML=list.map(e=>`

<div class="course-card">

<h3>${e.course.courseName}</h3>

<p>Enrolled: ${e.enrollmentDate}</p>

<button onclick="dropCourseUI(${e.courseId})">

Drop Course

</button>

</div>

`).join("");

}

async function dropCourseUI(courseId){

const msg=await dropCourse(studentId,courseId);

alert(msg);

loadEnrollments();

}

loadEnrollments();