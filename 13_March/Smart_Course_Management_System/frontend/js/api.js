const API_BASE = "http://localhost:5184/api";


/* =========================
   COURSES
========================= */

async function getCourses(){

    const response = await fetch(`${API_BASE}/Courses`);

    const data = await response.json();

    return data;

}

async function updateCourse(id, course){

    const response = await fetch(`${API_BASE}/Courses/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(course)

    });

    return response;

}

async function createCourse(course){
// template literals
    const response = await fetch(`${API_BASE}/Courses`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(course)

    });

    return await response.json();

}


async function deleteCourse(courseId){

    await fetch(`${API_BASE}/Courses/${courseId}`,{

        method:"DELETE"

    });

}



/* =========================
   ENROLLMENT
========================= */

async function enrollStudent(studentId,courseId){

    const response = await fetch(

        `${API_BASE}/Enrollment/enroll?studentId=${studentId}&courseId=${courseId}`,

        { method:"POST" }

    );

    return await response.text();

}


async function getEnrollments(){

    const response = await fetch(`${API_BASE}/Enrollment`);

    const data = await response.json();

    return data;

}


async function dropCourse(studentId,courseId){

    const response = await fetch(

        `${API_BASE}/Enrollment/drop?studentId=${studentId}&courseId=${courseId}`,

        { method:"POST" }

    );

    return await response.text();

}