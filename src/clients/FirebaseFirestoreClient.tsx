import {DesignType} from '../components/Canvas'
import FirebaseClient from './FirebaseClient'
import "firebase/firestore";

import FirebaseAnalyticsClient from './FirebaseAnalyticsClient'

const firestoreDb = FirebaseClient.firebaseApp.firestore()

const getDesigns = async (): Promise<DesignType[]> => {
  return firestoreDb.collection("saved-designs").get().then((querySnapshot) => {
    let savedDesigns:DesignType[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      const data = doc.data()
      const savedDesign:DesignType = {
        title: doc.id,
        elements: [...data.elements]
      }

      savedDesigns.push(savedDesign)
    })

    return savedDesigns
  })
}

const createDesign = async (designToSave: DesignType) => {
  firestoreDb.collection("saved-designs").add({
    ...designToSave
  })
    .then((docRef) => {
      FirebaseAnalyticsClient.analyticsSavedDesign({...designToSave, docRef: docRef})
      console.log("Saved Design ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error saving document: ", error);
    });

}

// eslint-disable-next-line
export default {
  createDesign,
  getDesigns,
  firestoreDb
}