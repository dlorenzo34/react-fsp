import { storage } from '../../config/fbConfig';

export const createProject = (newProject) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const fileRef = storage.ref().child('files').child(newProject.fileName);
    const newFileRef = firestore.collection('files').doc();
    newFileRef.set({
      fileDescription: newProject.fileDescription,
      fileName: newProject.fileName,
      fileTitle: newProject.fileTitle,
      ui: newProject.userUi,
    }).then(() => {
      fileRef.put(newProject.file).then(function(snapshot) {
        console.log('Uploaded a blob or file! ->', snapshot);
      }).catch(function(error) {
        console.log("Error ->", error)
      });
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' });
    });
  }
}