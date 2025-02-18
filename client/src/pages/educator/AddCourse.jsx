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


const handleChapter=(action,chapterId)=>
{
  if(action==='add')
  {
    const title=prompt('Enter Chapter Name:');
    if(title)
    {
      const newChapter={
        chapterId:uniqid(),
        chapterTitle:title,
        chapterContent:[],
        collapsed:false,
        chapterOrder:chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
      };
      setchapters([...chapters,newChapter]);
    }
  }
   else if(action==='remove')
    {
      setchapters(chapters.filter((chapter)=>chapter.chapterId!==chapterId));
    }
    else if(action==='toggle')
    {
      setchapters(
        chapters.map((chapter)=>chapter.chapterId===chapterId ? {...chapter,collapsed:!chapter.collapsed}:chapter)
      )
    }
}

const handlelecture=(action, chapterId,lectureidx)=>
{
  if(action==='add')
  {
    setcurrentChapterId(chapterId);
    setshowPopup(true);
  }
  else if(action==='remove')
  {
    setchapters(
      chapters.map((chapter)=>
      {
        if(chapter.chapterId===chapterId)
        {
          chapter.chapterContent.splice(lectureidx,1);
        }
        return chapter;
      })
    )
  }
};


const addLecture=()=>
{
  setchapters(
    chapters.map((chapter)=>
    {
      if(chapter.chapterId===currentChapterId)
      {
        const newLecture={
          ...lectureDetails,
          lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 :1,
          lectureId: uniqid()
        };
        chapter.chapterContent.push(newLecture)
      }
      return chapter;
    })
  );
  setshowPopup(false);
  setlectureDetails(
    {
      lectureTitle:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree:false,
    }
  );
}

const handlesubmit=async(e)=>
{
  e.preventDefault()
}

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
      <form onSubmit={handlesubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
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
            <p>Course Price</p>
            <input onChange={e=>setcoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0'
            className='outline-none md:py-2.5 py-2 w-28  px-3 rounded border border-gray-500'/>
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
              <img src={assets.file_upload_icon}  alt='' className='p-3 bg-blue-500 rounded'/>
              <input type='file' id='thumbnail' onChange={e=>setimage(e.target.files[0])} accept='image/*' hidden/>
              <img className='max-h-10' src={image ? URL.createObjectURL(image): ''} alt=''/>
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input onChange={e=>setdiscount(e.target.value)} value={discount} type="number" placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
        </div>

        {/* {Adding Chapters and Lectures} */}
        <div>
          {chapters.map((chapter,chapteridx)=>(
            <div key={chapteridx} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                   <img onClick={()=>handleChapter('toggle',chapter.chapterId)}
                   src={assets.dropdown_icon} alt='dropdown_icon' width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`}/>
                   <span className='font-semibold'>{chapteridx+1}{chapter.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length}Lectures</span>
                <img onClick={()=>handleChapter('remove',chapter.chapterId)}
                src={assets.cross_icon} alt="" className='cursor-pointer'/>
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                    {chapter.chapterContent.map((lecture,lectureidx)=>(
                      <div key={lectureidx} className='flex justify-between items-center mb-2'>
                        <span>{lectureidx+1}{lecture.lectureTitle}-{lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target="_blank" className='text-blue-500'>Link</a> -{lecture.isPreviewFree ? 'Free Preview' : 'Paid'}  </span>
                        <img src={assets.cross_icon} alt="cross_icon" onClick={()=>handlelecture('remove',chapter.chapterId,lectureidx)} className='cursor-pointer'/>
                      </div>
                    ))}
                    <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'  onClick={()=>handlelecture('add',chapter.chapterId)}>+ Add Lecture </div>
                </div>
              )}
            </div>
          ))}
          <div  className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>handleChapter('add')}>+ Add Chapter</div>
           {
            showPopup && (
              <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                   <h className='text-lg font-semiboldmb-4'> Add Lecture</h>
                   
                   <div className='mb-2'>
                       <p>Lecture Title</p>
                       <input
                       type='text'
                       className='mt-1 block w-full border rounded py-1 px-2'
                       value={lectureDetails.lectureTitle}
                       onChange={(e)=>setlectureDetails({...lectureDetails,lectureTitle:e.target.value})}
                       />
                   </div>
                   <div className='mb-2'>
                       <p>Duration (minutes)</p>
                       <input
                       type='number'
                       className='mt-1 block w-full border rounded py-1 px-2'
                       value={lectureDetails.lectureDuration}
                       onChange={(e)=>setlectureDetails({...lectureDetails,lectureDuration: e.target.value})}
                       />
                   </div>
                   <div className='mb-2'>
                       <p>Lecture URL</p>
                       <input
                       type='text'
                       className='mt-1 block w-full border rounded py-1 px-2'
                       value={lectureDetails.lectureUrl}
                       onChange={(e)=>setlectureDetails({...lectureDetails,lectureUrl: e.target.value})}
                       />
                   </div>
                   <div className='flex gap-2 my-4'>
                       <p>Is Preview Free?</p>
                       <input
                       type='checkbox'
                       className='mt-1 scale-125'
                       value={lectureDetails.isPreviewFree}
                       onChange={(e)=>setlectureDetails({...lectureDetails,isPreviewFree: e.target.checked})}
                       />
                   </div>

                    <button type='button' className='w-full bg-blue-400 text-white px-4 py-2 rounded' 
                    onClick={addLecture}>Add</button>
                   <img onClick={()=>setshowPopup(false)} src={assets.cross_icon} className='absolute top-4 right-4 w-4 cursor-pointer' alt=''/>
                </div>
              </div>

            )
           }
        </div>
        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-8'>ADD</button>    
      </form>

    </div>
  )
}

export default AddCourse