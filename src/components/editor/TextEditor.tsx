"use client";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';

type TextEditorProps = {
  onChange?: (content: string) => void;
  defaultValue?: string;
};


const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function TextEditor({onChange, defaultValue} : TextEditorProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const handleQuillChange = (content :any) => {
    setValue(content);
    if(onChange){
      onChange(content);
    }
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'font',
    'background',
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3,4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],  
      ['link'],
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'font': [] }],
    ],
  };

  return (
    <div className='h-auto min-h-min max-h-[400px] overflow-auto'>
      <ReactQuill
        value={value}
        onChange={handleQuillChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
}
