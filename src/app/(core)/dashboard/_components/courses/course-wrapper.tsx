import { getCoursesByUser } from '@/services/courses/actions'
import React, { Suspense } from 'react'
import { CoursesClient } from './courses-client'

export const CourseWrapper = async () => {
 const courses = await getCoursesByUser()

 
  return (
    <Suspense fallback={<div>Cargando...</div>}>
        <CoursesClient courses={courses}/>
    </Suspense>
  )
}
