export default class firestore {
  async getFlickLists(db: any, userId: number): Promise<Array<any>> {
    console.log(db);
    return new Promise((resolve, reject) => {
      db.firestore()
        .collection('flicklists')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot: any) => {
          const lists: Array<Object> = [];
          querySnapshot.forEach((doc: any) => {
            //   // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, ' => ', doc.data());
            //   resolve(doc.data());
            lists.push(doc.data());
          });
          resolve(lists);
        })
        .catch((error: any) => {
          reject(`Error getting documents: ${error}`);
        });
    });
  }
}
