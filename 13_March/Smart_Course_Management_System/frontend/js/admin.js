/* ==============================
   ADMIN DASHBOARD SCRIPT
================================*/

let editingCourseId = null;


/* ==============================
   LOAD COURSES
================================*/

async function loadCoursesAdmin(){

    const courses = await getCourses();

    const container = document.getElementById("adminCourseList");

    container.innerHTML = courses.map(course => `

        <div class="course-card">

            <h3>${course.courseName}</h3>

            <p><b>Credits:</b> ${course.credits}</p>

            <p><b>Department:</b> ${course.departmentId}</p>

            <div class="card-buttons">

                <button class="edit-btn"
                    onclick="editCourse(${course.courseId},
                    '${course.courseName}',
                    ${course.departmentId},
                    ${course.credits})">

                    Edit
                </button>

                <button class="delete-btn"
                    onclick="removeCourse(${course.courseId})">

                    Delete
                </button>

            </div>

        </div>

    `).join("");

}


/* ==============================
   ADD COURSE
================================*/

async function addCourse(){

    const course = {

        courseName: document.getElementById("courseName").value,

        departmentId: parseInt(
            document.getElementById("departmentId").value
        ),

        credits: parseInt(
            document.getElementById("credits").value
        ),

        seatsAvailable: true
    };

    await createCourse(course);

    alert("Course Added Successfully");

    clearForm();

    loadCoursesAdmin();

}


/* ==============================
   EDIT COURSE
================================*/

function editCourse(id,name,dept,credits){

    editingCourseId = id;

    document.getElementById("courseName").value = name;

    document.getElementById("departmentId").value = dept;

    document.getElementById("credits").value = credits;

}


/* ==============================
   UPDATE COURSE
================================*/

async function updateCourseUI(){

    if(!editingCourseId){

        alert("Select a course to edit first");

        return;

    }

    const course = {

        courseId: editingCourseId,

        courseName: document.getElementById("courseName").value,

        departmentId: parseInt(
            document.getElementById("departmentId").value
        ),

        credits: parseInt(
            document.getElementById("credits").value
        ),

        seatsAvailable: true
    };

    await updateCourse(editingCourseId,course);

    alert("Course Updated Successfully");

    clearForm();

    loadCoursesAdmin();

}


/* ==============================
   DELETE COURSE
================================*/

async function removeCourse(id){

    const confirmDelete = confirm("Delete this course?");

    if(!confirmDelete) return;

    await deleteCourse(id);

    alert("Course Deleted");

    loadCoursesAdmin();

}


/* ==============================
   ENROLLMENT HISTORY
================================*/

async function loadEnrollmentHistory(){

    const enrollments = await getEnrollments();

    const container = document.getElementById("historyList");

    container.innerHTML = enrollments.map(e => {

        const status = e.dropDate
            ? `<span class="status-dropped">Dropped</span>`
            : `<span class="status-active">Active</span>`;

        const enrolledDate =
            new Date(e.enrollmentDate).toLocaleString();

        const droppedDate =
            e.dropDate
            ? new Date(e.dropDate).toLocaleString()
            : "Still Enrolled";

        return `

        <div class="history-card">

            <h3>${e.course.courseName}</h3>

            <p><b>Student:</b> ${e.studentId}</p>

            <p><b>Enrolled:</b> ${enrolledDate}</p>

            <p><b>Dropped:</b> ${droppedDate}</p>

            <p><b>Status:</b> ${status}</p>

        </div>

        `;

    }).join("");

}


/* ==============================
   CLEAR FORM
================================*/

function clearForm(){

    document.getElementById("courseName").value = "";

    document.getElementById("departmentId").value = "";

    document.getElementById("credits").value = "";

    editingCourseId = null;

}


/* ==============================
   INITIAL LOAD
================================*/

loadCoursesAdmin();