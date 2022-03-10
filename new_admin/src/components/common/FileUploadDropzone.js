// import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { fileUploadApi } from '../../api/fileApi';
// import { FTP_URL } from '../../constants';

// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16,
// };

// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: 'border-box',
// };

// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden',
// };

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%',
// };

// const FileUploadDropzone = ({ defaultFiles, defaultDirectory, maxFiles }) => {
//   const [files, setFiles] = useState(defaultFiles ? JSON.parse(defaultFiles) : []);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*',
//     onDrop: files => {
//       if (files.length > maxFiles) {
//         alert(`${maxFiles}개 이상 파일만 업로드 가능 합니다.`);
//         return;
//       }
//       files.forEach(file => {
//         fileUploadApi(defaultDirectory, file)
//           .then(({ success }) => {
//             alert(success);
//             if (!success) alert('업로드에 실패 하였습니다');
//           })
//           .catch(e => {
//             alert('server error');
//             console.error(e);
//           });
//       });
//       /* setFiles(
//         acceptedFiles.map(file =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           }),
//         ),
//       ); */
//     },
//   });

//   const thumbs = files.map(file => (
//     <div style={thumb} key={file.name}>
//       <div style={thumbInner}>
//         <img src={file.preview} style={img} />
//       </div>
//     </div>
//   ));

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks
//     files.forEach(file => URL.revokeObjectURL(file.preview));

//     console.log(getRootProps({ className: 'dropzone' }));
//   }, [files]);

//   return (
//     <Card {...getRootProps()} sx={{ maxWidth: 270 }}>
//       <input {...getInputProps()} />
//       {files.length === 0 ? (
//         <CardMedia component="img" height="150" image={``} />
//       ) : (
//         files.map(({ name, path }) => {
//           <CardMedia component="img" height="150" image={`${FTP_URL}${path}`} />;
//         })
//       )}
//       {/* {files.map(({ name, path }) => (
//         <CardMedia component="img" height="150" image={`${FTP_URL}/${path}`} />
//       ))} */}

//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           파일을 드래그 하거나 클릭하여
//           <br /> 선택하십시오
//         </Typography>
//       </CardContent>
//       {JSON.stringify(files)}
//     </Card>
//   );
// };

// export default FileUploadDropzone;

import { Upload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FTP_URL } from '../../constants';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const FileUploadDropzone = ({ filePath, onDrop }) => {
  const files = filePath ? JSON.parse(filePath) : [];
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => {
      onDrop(files);
    },
  });

  const thumbs = files.map(({ name, path }) => (
    <div style={thumb} key={name}>
      <div style={thumbInner}>
        <img src={`${FTP_URL}/${path}`} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    //files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Box mt={2}>
      <Button {...getRootProps({ className: 'dropzone' })} variant="contained" color="info" startIcon={<Upload />}>
        <input {...getInputProps()} />
        업로드
      </Button>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Box>
  );
};

export default FileUploadDropzone;
