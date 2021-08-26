import FirebaseClient from "./FirebaseClient";

export type DesignType = {
  id?: string,
  title?: string,
  elements?: DesignElementType[]
}

export enum DesignElementTypesEnum {
  ICON,
  TEXT
}

export type FontFace = {
  fontDisplay: any
  fontFamily: any
  fontStyle: any
  fontWeight: number
  src: string
}

export type DesignElementType = {
  size?: { height: number, width: number },
  x?: number,
  y?: number,
  text?: string,
  fontSize?: number,
  fontFace?: FontFace,
  flickerOn?: boolean,
  flickerStyle?: "PULSATE" | "SUBTLE" | "BASIC" | string,
  color?: "green" | "fuchsia" | "yellow" | "blue" | "violet" | string
  layer?: number,
  type?: DesignElementTypesEnum
}

const db = FirebaseClient.app.firestore();

const getDesign = async (designId: string): Promise<DesignType> => {
  console.log("GetDesign: ID: ", designId);

  const doc = await db.collection("saved-designs").doc(designId).get();

  if (!doc.exists) {
    console.log("No such document!");
    return {};
  } else {
    console.log("Document data:", doc.data());
    const data = doc.data();

    const savedDesign: DesignType = {
      id: data?.id,
      title: data?.title,
      elements: [...data?.elements],
    };

    return savedDesign;
  }
};

// const getDesigns = async (): Promise<DesignType[]> => {
// eslint-disable-next-line max-len
//   return firestoreDb.collection("saved-designs").get().then((querySnapshot) => {
//     const savedDesigns: DesignType[] = [];
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       // console.log(doc.id, " => ", doc.data());
//
//       const data = doc.data();
//       const savedDesign: DesignType = {
//         id: doc.id,
//         title: data.title,
//         elements: [...data.elements],
//       };
//
//       savedDesigns.push(savedDesign);
//     });
//
//     return savedDesigns;
//   });
// };

// const createDesign = async (designToSave: DesignType) => {
//   firestoreDb.collection("saved-designs").add({
//     ...designToSave,
//   })
//       .then((docRef) => {
//       // FirebaseAnalyticsClient
//       //     .analyticsSavedDesign({...designToSave, docRef: docRef});
//         console.log("Saved Design ID: ", docRef.id);
//       })
//       .catch((error) => {
//         console.error("Error saving document: ", error);
//       });
// };

// eslint-disable-next-line
export default {
  getDesign,
  db,
};
