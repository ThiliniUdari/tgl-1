import firebase from 'firebase/app';
import 'firebase/firestore';
import { Alert } from 'react-bootstrap';
 
export const clean = () => ({
  type: 'CLEAN_UP',
});
// reset email

export const resetEmail =(creds) =>{
  return(dispatch ,getState)=>{
    var user = firebase.auth().currentUser;
    user.updateEmail(creds.email).then(()=> {
      // Update successful.
         dispatch ({type: 'RESET_EMAIL_SUCCESS'})
    }).catch((error)=> {
      // An error happened.
      dispatch ({type: 'RESET_EMAIL_FAILED',error})
    });
  }
}

// recover passsword
export const recoverPassword =(creds) => {
  return(dispatch ,getState,{getFirebase,getFirestore})=>{
    var firebase=getFirebase();
    var auth =firebase.auth();
    //test the function
    // var email='thilini96ucsc@gmail.com';
    var state = getState();
    console.log(state)
    auth.sendPasswordResetEmail(creds.email).then(() =>{
            }).catch((error) => {
         dispatch({type:'PASSWORD_RESET_ERROR',error})
     })
  }
}

// add messages  to the firbase collection
export const sendMessage =(message,type) => {
  
  return (dispatch ,getState,{getFirebase,getFirestore})=>{
 
    //   const admin = type.userType === 'admin'? id :null
    
    const state= getState()
    const auth= state.firebase.auth
    const type =state.firebase.profile
    let fromId =auth.uid 
    let toId = auth.uid && type.userType === 'customer' ? 'Admin' : fromId
   
    const firestore = getFirestore()
     firestore.collection('messages').add({
      ...message,
      to:toId,
      from:fromId,
      state:'unread'
      
    }).then(() =>{
         dispatch ({type: 'SEND_MESSAGE',message})
    }).catch((error) => {
      dispatch({type:'SEND_MESSAGE_ERROR',error})
    })
  }
}

// submit inquiries 
export const sendInquiries =( message)=>{
    return( dispatch,getState,{getFirebase,getFirestore}) =>{
      const state= getState()
      const auth= state.firebase.auth

      const firestore = getFirestore()
      firestore.collection('inquiries').add({
        ...message,
        id:auth.uid
      }).then(() =>{
        dispatch ({type: 'SEND_INQUIRY',message})
        }).catch((error) => {
          dispatch({type:'SEND_INQUIRY_ERROR',error})
        })
    }

}
export const sendFeedback=(variables)=>{
  return( dispatch,getState,{getFirebase,getFirestore}) =>{

  const templateId = 'template_MDkJHMoB';
  const state=getState()
  window.emailjs.send(
      'gmail', 
      templateId,
      variables
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
  }
export const addNotifications=(notification,dataType,data)=>{
  return(dispatch,getState,{getFirebase,getFirestore}) => {
    const state= getState()
    const auth= state.firebase.auth
    const firestore = getFirestore()
    firestore.collection('notifications').add({
      ...notification,
      from:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
      type:'hire accepted',
      data:"Hire Accepted",
      link:'/User/UserManageTools',
      createdAt:new Date()}).then(() => {
          dispatch({type: 'Hire_Accept_Notication_Added'});
      }).catch((err) => {
          dispatch({type: 'Notificaton_Add_ERROR', err});
      })
  }
}
// export const readNotication=()=>{

//   return(dispatch,getState,{getFirebase,getFirestore}) => {
//     const firestore = getFirestore();
//     firestore.collection('notifications').doc(id).delete().then(() => {
//         dispatch({type: 'NOTIFICATION READ AND DELETED'})
//     }).catch(err => {
//         dispatch({type: 'FAILED TO DELETE NOTIFICATION', err})
//     })
//   }
// }

// export const editHire = (customerId, data, records) => {
//
//     return(dispatch, getState, {getFirebase, getFirestore}) => {
//         const firestore = getFirestore();
//         firestore.collection(records).doc(customerId).update({
//             ...data
//         }).then(() => {
//             dispatch({type: 'DOCUMENT_UPDATED'});
//         }).catch((err) => {
//             dispatch({type: 'ERROR_UPDATING_DOCUMENT', err});
//         })
//     }
// }
