// import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useNavigate } from 'react-router-dom';

// export default function CreatePost() {
//   const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);

//   const navigate = useNavigate();

//   const handleUpdloadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError('Please select an image');
//         return;
//       }
//       setImageUploadError(null);
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + '-' + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setImageUploadError('Image upload failed');
//           setImageUploadProgress(null);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageUploadProgress(null);
//             setImageUploadError(null);
//             setFormData({ ...formData, image: downloadURL });
//           });
//         }
//       );
//     } catch (error) {
//       setImageUploadError('Image upload failed');
//       setImageUploadProgress(null);
//       console.log(error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/post/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setPublishError(data.message);
//         return;
//       }

//       if (res.ok) {
//         setPublishError(null);
//         navigate(`/post/${data.slug}`);
//       }
//     } catch (error) {
//       setPublishError('Something went wrong');
//     }
//   };
//   return (
//     <div className='p-3 max-w-3xl mx-auto min-h-screen'>
//       <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
//       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//         <div className='flex flex-col gap-4 sm:flex-row justify-between'>
//           <TextInput
//             type='text'
//             placeholder='Title'
//             required
//             id='title'
//             className='flex-1'
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//           <Select
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//           >
//             <option value='uncategorized'>Select a category</option>
//             <option value='javascript'>JavaScript</option>
//             <option value='reactjs'>React.js</option>
//             <option value='nextjs'>Next.js</option>
//           </Select>
//         </div>
//         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
//           <FileInput
//             type='file'
//             accept='image/*'
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <Button
//             type='button'
//             gradientDuoTone='purpleToBlue'
//             size='sm'
//             outline
//             onClick={handleUpdloadImage}
//             disabled={imageUploadProgress}
//           >
//             {imageUploadProgress ? (
//               <div className='w-16 h-16'>
//                 <CircularProgressbar
//                   value={imageUploadProgress}
//                   text={`${imageUploadProgress || 0}%`}
//                 />
//               </div>
//             ) : (
//               'Upload Image'
//             )}
//           </Button>
//         </div>
//         {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
//         {formData.image && (
//           <img
//             src={formData.image}
//             alt='upload'
//             className='w-full h-72 object-cover'
//           />
//         )}
//         <ReactQuill
//           theme='snow'
//           placeholder='Write something...'
//           className='h-72 mb-12'
//           required
//           onChange={(value) => {
//             setFormData({ ...formData, content: value });
//           }}
//         />
//         <Button type='submit' gradientDuoTone='purpleToPink'>
//           Publish
//         </Button>
//         {publishError && (
//           <Alert className='mt-5' color='failure'>
//             {publishError}
//           </Alert>
//         )}
//       </form>
//     </div>
//   );
// }

import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

// Import Quill modules for additional functionality
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

import { AiOutlineCode } from 'react-icons/ai'; // Replace with the correct import from React Icons
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose your preferred syntax highlighting style

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-image"></button>
    <button className="ql-align" value=""></button>
    <button className="ql-align" value="center"></button>
    <button className="ql-align" value="right"></button>
    <button className="ql-align" value="justify"></button>
    <button className="ql-clean"></button>

    <button className="ql-remove-image">
      <BsTrash />
    </button>
    <button className="ql-insert-elements">
      <i className="fa fa-square"></i>
    </button>
    <button className="ql-code-block">
      <AiOutlineCode />
    </button>
  </div>
);

const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      'remove-image': function() {
        const editor = this.quill;
        const range = editor.getSelection();
        if (range) {
          const [leaf] = editor.getLeaf(range.index);
          if (leaf && leaf.domNode.tagName === 'IMG') {
            const blot = Quill.find(leaf.domNode);
            blot.remove();
          }
        }
      },
      'insert-elements': function() {
        const editor = this.quill;
        const range = editor.getSelection(true);
        const value = prompt('Enter the element type (square, rectangle, circle):');
        let element;
        switch (value) {
          case 'square':
            element = `<div style="width: 100px; height: 100px; background-color: black;"></div>`;
            break;
          case 'rectangle':
            element = `<div style="width: 150px; height: 100px; background-color: black;"></div>`;
            break;
          case 'circle':
            element = `<div style="width: 100px; height: 100px; border-radius: 50%; background-color: black;"></div>`;
            break;
          default:
            alert('Invalid element type');
            return;
        }
        editor.clipboard.dangerouslyPasteHTML(range.index, element);
      },
      'code-block': function() {
        const editor = this.quill;
        const range = editor.getSelection(true);
        editor.format('code-block', true);
        editor.setSelection(range.index + 1);
      }
    }
  },
  imageDrop: true,
  imageResize: {
    parchment: Quill.import('parchment')
  },
  syntax: {
    highlight: text => SyntaxHighlighter.highlight(text, tomorrow) // Adjust the style as needed
  }
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'color', 'background', 'image', 'align', 'code-block'
];

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
      const data = await res.json();
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError(error.message || 'Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='leetcode'>Top Interview 150</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`} 
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <CustomToolbar />
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          modules={modules}
          formats={formats}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
