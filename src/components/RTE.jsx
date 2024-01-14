import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from "react-hook-form";


function RTE({name,control,label, default_value=''}) {

   
  return (
    <div className='w-full'>
      {label && <label htmlFor='' className=''>{label}</label>}
    <Controller
    name={name}
    control={control}
    render={({field:{onChange}})=>(
         
        <Editor
         initialValue={default_value}
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onEditorChange={onChange}
       />
    //    <button onClick={log}>Log editor content</button>
   
    )}
    />  
    </div>
  )
}

export default RTE
