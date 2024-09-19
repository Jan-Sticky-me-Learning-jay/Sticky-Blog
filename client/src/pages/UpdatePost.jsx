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
// import { useEffect, useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function UpdatePost() {
//   const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);
//   const { postId } = useParams();

//   const navigate = useNavigate();
//     const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     try {
//       const fetchPost = async () => {
//         const res = await fetch(`/api/post/getposts?postId=${postId}`);
//         const data = await res.json();
//         if (!res.ok) {
//           console.log(data.message);
//           setPublishError(data.message);
//           return;
//         }
//         if (res.ok) {
//           setPublishError(null);
//           setFormData(data.posts[0]);
//         }
//       };

//       fetchPost();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }, [postId]);

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
//       const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
//         method: 'PUT',
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
//       <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
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
//             value={formData.title}
//           />
//           <Select
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             value={formData.category}
//           >
//             <option value='uncategorized'>Select a category</option>
//             <option value='javascript'>JavaScript</option>
//             <option value='reactjs'>React.js</option>
//             <option value='nextjs'>Next.js</option>
//             <option value='leetcode'>LeetCode</option>
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
//           value={formData.content}
//           placeholder='Write something...'
//           className='h-72 mb-12'
//           required
//           onChange={(value) => {
//             setFormData({ ...formData, content: value });
//           }}
//         />
//         <Button type='submit' gradientDuoTone='purpleToPink'>
//           Update post
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
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

// Import Quill modules for additional functionality
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

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
    <button id="remove-image">
      <BsTrash />
    </button>
    <button id="insert-elements">
      <i className="fa fa-square"></i>
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
      }
    }
  },
  imageDrop: true,
  imageResize: {
    parchment: Quill.import('parchment')
  }
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'color', 'background', 'image', 'align'
];

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

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
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update post');
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
      <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
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
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='leetcode'>LeetCode</option>
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
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          modules={modules}
          formats={formats}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update post
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
