import React, { useEffect, useRef,useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef=useRef(null);
  const editorRef=useRef(null);

  const[courseTitle,setcourseTitle]=useState('')
  const[coursePrice,setcoursePrice]=useState(0)
  const[discount,setdiscount]=useState(0)
  const[image,setimage]=useState(null)
  const[chapters,setchapters]=useState([])
  const[showPopup,setshowPopup]=useState(false)
  const[currentChapterId,setcurrentChapterId]=useState(null)
  const[lectureDetails,setlectureDetails]=useState({
    lectureTitle:'',
    lectureDuration:'',
    lectureUrl:'',
    isPreviewFree:false,
  })
  useEffect(()=>
  {
    if(!quillRef.current && editorRef.current)
    {
      quillRef.current=new Quill(editorRef.current,{
        theme:'snow',
      })
    }
  },[])

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e=>setcourseTitle(e.target.value)} value={courseTitle} type='text' placeholder='Type here'
          className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required/>
        </div>
        <div className='flex flex-col gap-1'>
         <p>Course Description</p>
         <div ref={editorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Detail</p>
            <input onChange={e=>setcoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0'
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'/>
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
              <img src={assets.file_upload_icon}  alt='' className='p-3 bg-blue-500 rounded'/>
              <input type='file' id='thumbnail' onChange={e=>setimage(e.target.files[0])} accept='image/*' hidden/>
              <img className='max-h-10' src={image ? URL.createObjectURL(image):''} alt=''/>
            </label>
          </div>
        </div>
      </form>

    </div>
  )
}

export default AddCourse